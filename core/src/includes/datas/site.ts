/**
 * core 内部使用
 */
import { http } from '../functions';

// Types
import { SiteApi } from 'types/datas/site';
import { SiteSettings } from 'types/functions/settings';

export const siteApi: SiteApi = {
  /**
   * 获取网站配置
   */
  getConfigs() {
    return http.getList('config/base-info').then(({ models = [] }) => {
      return (models as Array<{ configKey: string; configValue: any }>).reduce((obj, curr) => {
        obj[curr['configKey'] as keyof SiteSettings] = curr['configValue'];
        return obj;
      }, {} as Record<string, any>);
    });
  },

  // 获取 SEO 配置
  getSEOConfigs() {
    return http.getList('config/seo').then(({ models = [] }) => {
      return models.map(({ configKey, configValue, ...rest }) => ({
        name: configKey,
        content: configValue,
        ...rest,
      }));
    });
  },

  /**
   * 获取主题配置
   */
  getThemes() {
    return http.get('config/theme-color').then(({ model = {} }) => model);
  },

  /** 获取主题模块 */
  getThemeModule() {
    return http.get('modules/themes').then(({ model }) => model);
  },

  /** 获取插件模块 */
  getPluginModules() {
    return http.getList('modules/plugins').then(({ models = [] }) => models);
  },
};
