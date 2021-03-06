import Vue from 'vue';
import Axios from 'axios';
import { hasOwn, error as globalError } from '@vue-async/utils';
import { http, hook } from '@/includes/functions';
import { tagApi, articleApi, categoryApi } from '@/includes/datas';
import * as directives from '@/directives';
import * as filters from '@/filters';
import bootstrap from './bootstrap';

// 添加到 Vue.protytype 上的属性和方法
import prototypeArgs from '@/includes/prototype';

// Types
import { DirectiveOptions, DirectiveFunction } from 'vue';
import { Plugin } from '@nuxt/types';

// Register global directives
Object.keys(directives).map((key) => {
  Vue.directive(key, (directives as Dictionary<DirectiveOptions | DirectiveFunction>)[key]);
});

// Register global filter functions
Object.keys(filters).map((key) => {
  Vue.filter(key, (filters as Dictionary<Function>)[key]);
});

// 注入 http 到 Vue
Vue.axios = Axios;
Vue.$http = http;

// 异常处理
Vue.config.errorHandler = function (err: Error, vm: Vue, info: string) {
  if (process.env.NODE_ENV === 'production') {
    // todo: 总的 error 处理, 推送到服务端
  } else {
    globalError(false, `[core] Error(${info})：${err.message || err}`, vm);
  }

  if (vm && vm.$root) {
    // do something if vue instance is exists
  }
};

const plugin: Plugin = async (cxt) => {
  const { app } = cxt;

  /**
   * root vue created/mounted 勾子
   */
  const _created = app.created;
  const _mounted = app.mounted;
  app.created = function created() {
    // 管理后台启动里的一些配置参数
    bootstrap();

    hook('app_created').exec();
    _created && _created.call(this);
  };
  app.mounted = function mounted() {
    hook('app_mounted').exec();
    _mounted && _mounted.call(this);

    // plugin 中无法使用 error 方法，通过 hook 去显示错误
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
  cxt.articleApi = articleApi;
  cxt.categoryApi = categoryApi;
  cxt.tagApi = tagApi;
  // cxt.siteApi = siteApi; // 暂时不导出，仅内部使用

  /**
   * 加载网站配置文件
   */
  // const metaKeys = ['description', 'keywords'];
  // const metas: Array<{ name: string; content: any }> = []; // 提升给后面SEO使用
  // try {
  //   const configs = await siteApi.getConfigs();
  //   const settings: Partial<SiteSettings> = {};

  //   Object.keys(configs).forEach((key) => {
  //     if (hasOwn(globalSettings, key)) {
  //       settings[key as keyof SiteSettings] = configs[key];
  //     } else if (metaKeys.some((metaKey) => metaKey === key)) {
  //       metas.push({
  //         name: key,
  //         content: configs[key],
  //       });
  //     }
  //   });

  //   settingsFuncs.setSiteSettings(settings);
  // } catch (err) {
  //   globalError(process.env.NODE_ENV === 'production', `[core] 站点配置加载失败, 错误：${err.message}`);
  //   // error({ statusCode: 500, message: '站点配置加载失败' });
  // }

  /**
   * 加载用户配置
   */
  // try {
  //   const configs = await siteApi.getUserInfo();
  //   settingsFuncs.setUserInfo(configs);
  // } catch (err) {
  //   globalError(process.env.NODE_ENV === 'production', `[core] 用户配置加载失败, 错误：${err.message}`);
  //   // error({ statusCode: 500, message: '用户配置加载失败' });
  // }

  /**
   * 加载 admin Theme 配置
   */
  // try {
  //   const configs = await siteApi.getTheme();
  //   themeFn.setThemes(configs.dark, configs.themes);
  // } catch (err) {
  //   globalError(process.env.NODE_ENV === 'production', `[core] Theme配置加载失败, 错误：${err.message}`);
  //   // error({ statusCode: 500, message: 'Theme配置加载失败' });
  // }
};

export default plugin;
