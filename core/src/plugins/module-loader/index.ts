import Vue from 'vue';
import { MetaInfo } from 'vue-meta';
import VueRouter from 'vue-router';
import ModuleLoader from '@vue-async/module-loader';
import { error as globalError, warn as globalWarn } from '@vue-async/utils';
import { hook } from '@/includes/functions';
import { siteApi } from '@/includes/datas';

// megre routes
import { megreRoutes, root } from '../router/utils';

// args
import themeArgs from '@/includes/theme';
import pluginArgs from '@/includes/plugin';

// Types
import { NuxtError, Plugin } from '@nuxt/types';
import { ThemeOptions } from 'types/theme-options';
import { PluginOptions } from 'types/plugin-options';
import { ModuleConfig } from 'types';

Vue.use(ModuleLoader);

const plugin: Plugin = async (cxt) => {
  const { app, store, $i18n } = cxt;
  /**
   * 添加路由
   * 放在模块入口文件 options 中，而不入在 Context 中，因为 Context 会传递到子模块中
   * todo: 是否初始化多语言
   */
  const addRoutes: ThemeOptions['addRoutes'] = (routes, megreFn = megreRoutes) => {
    const options = app.router!.options;
    megreFn(options.routes!, root(routes));
    const newRouter = new VueRouter(options);
    (app.router as any).matcher = (newRouter as any).matcher;
  };

  // 传递到主题模块的参数
  const _themeArgs: ThemeOptions = Object.freeze({
    ...themeArgs,
    addRoutes,
  });

  let themeModule: ModuleConfig | null = null;
  try {
    themeModule = await siteApi.getThemeModule();
    if (!themeModule) {
      globalError(process.env.NODE_ENV === 'production', `[core] 未配置主题模块`);
      return hook('__PLUGIN_ERROR__', (error?: NuxtError | null) => {
        return (
          error || { statusCode: 500, message: $i18n.tv('error.themeModuleUnset', 'Theme module does not set up') }
        );
      });
    } else {
      themeModule.args = _themeArgs;
    }
  } catch (err) {
    globalError(process.env.NODE_ENV === 'production', `[core] 主题模块加载失败， 错误:${err.message}`);
    return hook('__PLUGIN_ERROR__', (error?: NuxtError | null) => {
      return error || { statusCode: 500, message: $i18n.tv('error.themeModuleLoadError', 'Theme module load error') };
    });
  }

  // 传递到插件模块的参数
  const _pluginArgs: PluginOptions = Object.freeze({
    ...pluginArgs,
  });

  let pluginModules: ModuleConfig[] = [];
  try {
    pluginModules = await siteApi.getPluginModules();
    pluginModules.map((module) => {
      module.args = _pluginArgs;
    });
  } catch (err) {
    globalError(process.env.NODE_ENV === 'production', `[core] 插件模块加载失败，错误:${err.message}`);
    return hook('__PLUGIN_ERROR__', (error?: NuxtError | null) => {
      return (
        error || { statusCode: 500, message: $i18n.tv('error.pluginModulesLoadError', 'Plguin modules load error') }
      );
    });
  }

  const moduleLoader = new ModuleLoader({
    // 重写 addRouter，阻止 plugin 中调用
    addRoutes: () => {
      /** do nothing */
    },
  }).registerDynamicComponent(store);

  /**
   * 加载 theme 和 plugin, 按顺序执行
   */
  await moduleLoader.load([themeModule!, ...pluginModules], {
    sync: true, // 同步执行，theme 优先加载，然后加载插件
    error: (msg: string) => {
      // 此处只会提示错误，不会阻止 success 执行
      globalWarn(false, `[core] 模块加载中出错，已忽略。 ${msg}`);
    },
  });

  // 暂不把对象传出去
  // cxt.app.moduleLoader = moduleLoader;
  // cxt.$moduleLoader = moduleLoader

  //
  // -- theme 与 plugin 加载完成，入口文件中的方法全部执行完成 --
  // 以下可以执行到入口文件中注入的 hook 了~~~
  //

  /**
   * 自定义 head title template 勾子
   */
  const _head = app.head! as MetaInfo;
  if (hook('head_title_template').has()) {
    await hook('head_title_template')
      .filter(_head.titleTemplate)
      .then((template) => {
        _head.titleTemplate = template;
      });
  }

  /**
   * init 勾子
   * 所有子模块初始化完成，并且在 new Vue() 之前
   */
  await hook('init').exec(cxt);
};

export default plugin;
