/**
 * 中文
 */

const components = {
  pageLoading: {
    text: '加载中...',
  },
};

const locale = {
  // pages
  home: {
    title: '首页',
    usage: '使用说明',
  },

  error: {
    404: '页面未找到',
    500: '系统错误',
    description: '在页面渲染时发生错误，请在控制台中查看详情。',
    backToHomeBtnText: '返回@:home.title',

    // plugins error
    siteSettingsLoadError: '站点配置加载失败',
    userInfoLoadError: '用户配置加载失败',
    themeModuleUnset: '未配置主题模块',
    themeModuleLoadError: '主题模块加载失败',
    pluginModulesLoadError: '插件模块加载失败',
  },
};

export default {
  name: '简体中文',
  ...locale,
  ...components,
};
