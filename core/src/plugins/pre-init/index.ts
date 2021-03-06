import Vue from 'vue';
import Axios from 'axios';
import { error as globalError, warn as globalWarn, hasOwn } from '@vue-async/utils';
import { hook, http, themeFuncs, settingsFuncs } from '@/includes/functions';
import { tagApi, articleApi, categoryApi, userApi, siteApi } from '@/includes/datas';
import themeFn from '@/includes/theme';

// components
import PluginHolder from '~/components/PluginHolder';

// 添加到 Vue.protytype 上的属性和方法
import prototypeArgs from '@/includes/prototype';

// Types
import { NuxtError, Plugin } from '@nuxt/types';
import { MetaInfo } from 'vue-meta';

// 注入 http 到 Vue
Vue.axios = Axios;
Vue.$http = http;

// 异常处理
Vue.config.errorHandler = function (err: any, vm: any) {
  if (process.env.NODE_ENV === 'production') {
    // todo: 总的 error 处理, 推送到服务端
  } else {
    globalError(false, `[core] 错误：${err.message || err}`, vm);
  }

  if (vm && vm.$root) {
    // do something if vue instance is exists
  }
};

const plugin: Plugin = async (cxt) => {
  const { app, $i18n } = cxt;

  /**
   * root vue created/mounted 勾子
   */
  const _created = app.created;
  const _mounted = app.mounted;
  app.created = function created() {
    hook('app_created').exec();
    _created && _created.call(this);
  };
  app.mounted = function mounted() {
    // 生成 theme css 变量, todo: ssr
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'po-theme-stylesheet';
    style.setAttribute('data-n-head', 'po');
    style.innerHTML = themeFuncs.genCssStyles();
    document.getElementsByTagName('head')[0].appendChild(style);

    hook('app_mounted').exec();
    _mounted && _mounted.call(this);

    // plugin 中无法使用 error 方法，通过 hook 去显示错误

    this.$route.matched[0].path !== '*' && // 未匹配到路由
      this.$route.name !== 'error' && // route error 优先
      hook('__PLUGIN_ERROR__')
        .filter(null)
        .then((error) => {
          if (error) {
            this.error(error);
          }
        });
  };

  /**
   * 注册全局组件
   */
  Vue.component(PluginHolder.name, PluginHolder);

  /**
   *  注册全局方法
   * (global mixin 必须在 created 之后才可以被调用, 这里使用 defineProperties)
   * prototypeAres 已包含 api 部分
   */
  ((methods: Dictionary<any> = {}) => {
    Object.defineProperties(
      Vue.prototype,
      Object.keys(methods).reduce((prev, name) => {
        !hasOwn(prev, name) &&
          (prev[name] = {
            get() {
              return methods[name];
            },
            enumerable: true,
            configurable: true,
          });
        return prev;
      }, {} as PropertyDescriptorMap),
    );
  })({ ...prototypeArgs, axios: Axios, $http: http });

  /**
   * 添加 http and apis 到 Context
   */
  cxt.axios = Axios;
  cxt.$http = http;

  /**
   * for asyncData
   */
  cxt.categoryApi = categoryApi;
  cxt.tagApi = tagApi;
  cxt.articleApi = articleApi;
  cxt.userApi = userApi;
  // cxt.siteApi = siteApi; // 暂时不导出，仅内部使用

  /**
   * 加载网站配置文件
   */
  const metaKeys = ['description', 'keywords'];
  const metas: Array<{ name: string; content: any }> = []; // 提升给后面SEO使用
  try {
    const configs = await siteApi.getConfigs();
    const settings: Dictionary<any> = {};

    Object.keys(configs).forEach((key) => {
      // todo: 待 seo 配置接口分离
      if (metaKeys.some((metaKey) => metaKey === key)) {
        metas.push({
          name: key,
          content: configs[key],
        });
      } else {
        settings[key] = configs[key];
      }
    });

    settingsFuncs.setSiteSettings(settings);
  } catch (err) {
    globalError(process.env.NODE_ENV === 'production', `[core] 站点配置加载失败, 错误：${err.message}`);
    return hook('__PLUGIN_ERROR__', (error: NuxtError | null) => {
      return error || { statusCode: 500, message: $i18n.tv('error.siteSettingsLoadError', 'Site settings load error') };
    });
  }

  /**
   * SEO配置
   */
  try {
    let head: MetaInfo | (() => MetaInfo) | undefined;
    if ((head = app.head)) {
      // todo: 独立 seo 接口
      const configs = await siteApi.getSEOConfigs();
      if (typeof head === 'function') {
        app.head = () => {
          return Object.assign({}, (head as Function)(), { meta: configs });
        };
      } else {
        head.meta = (head.meta || []).concat(configs);
        app.head = head;
      }
    }
  } catch (err) {
    globalWarn(process.env.NODE_ENV === 'production', `[core] SEO配置加载失败, 错误：${err.message}`);
  }

  /**
   * 加载主题色配置
   */
  try {
    const configs = await siteApi.getThemes();
    themeFn.setThemes(configs.dark, configs.themes);
    themeFn.setDarkTheme(configs.dark);
  } catch (err) {
    globalWarn(process.env.NODE_ENV === 'production', `[core] 主题色配置加载失败, 错误：${err.message}`);
  }

  /**
   * 加载 Widgets 配置
   */
  try {
    // todo
  } catch (err) {
    globalWarn(process.env.NODE_ENV === 'production', `[core] 小组件配置加载失败, 错误：${err.message}`);
  }
};

export default plugin;
