import Vue from 'vue';
import VueRouter from 'vue-router';
import ModuleLoader from '@vue-async/module-loader';
import { error as globalError, warn as globalWarn } from '@vue-async/utils';
import { hook } from '@/includes/functions';
import { siteApi } from '@/includes/datas';

// megre routes
import { megreRoutes, root } from '../router/utils';

// args
import moduleArgs from '@/includes/module';

// Types
import { NuxtError, Plugin } from '@nuxt/types';
import { ModuleOptions } from 'types/module-options';
import { ModuleConfig } from 'types';

Vue.use(ModuleLoader);

// function interopDefault(promise: Promise<any>) {
//   return promise.then((m) => m.default || m);
// }

const plugin: Plugin = async (cxt) => {
  const { app, store, $i18n } = cxt;
  /**
   * 添加路由
   * 放在模块入口文件 options 中，而不入在 Context 中，因为 Context 会传递到子模块中
   * todo: 是否初始化多语言
   */
  const addRoutes: ModuleOptions['addRoutes'] = (routes, megreFn = megreRoutes) => {
    // (function fixRoutes(routes = []) {
    //   routes.forEach((route) => {
    //     console.log((route as any).component);
    //   });
    // })(routes);

    const options = app.router!.options;
    megreFn(options.routes!, root(routes));
    const newRouter = new VueRouter(options);
    (app.router as any).matcher = (newRouter as any).matcher;
  };

  // 传递到插件模块的参数
  const _moduleArgs: ModuleOptions = Object.freeze({
    ...moduleArgs,
    addRoutes,
  });

  let modules: ModuleConfig[] = [];
  try {
    modules = await siteApi.getModules();
    modules.map((module) => {
      module.args = _moduleArgs;
    });
  } catch (err) {
    globalError(process.env.NODE_ENV === 'production', `[core] 插件模块加载失败，错误:${err.message}`);
    return hook('__PLUGIN_ERROR__', (error?: NuxtError | null) => {
      return error || { statusCode: 500, message: $i18n.t('error.modulesLoadError') };
    });
  }

  const moduleLoader = new ModuleLoader({
    // 重写 addRouter，阻止 module 中调用
    addRoutes: () => {
      /** do nothing */
    },
  }).registerDynamicComponent(store);

  /**
   * 加载 module, 按顺序执行
   */
  await moduleLoader.load(modules, {
    sync: true, // 同步执行
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
   * init 勾子
   * 所有子模块初始化完成，并且在 new Vue() 之前
   */
  await hook('init').exec(cxt);
};

export default plugin;
