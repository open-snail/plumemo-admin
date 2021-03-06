/**
 * admin 内部使用
 */
import { http } from '../functions';

// Types
import { ModuleConfig, SiteApi } from 'types/datas/site';
// import { SiteSettings } from 'types/functions/settings';

export const siteApi: SiteApi = {
  // /**
  //  * 获取网站配置
  //  */
  // getConfigs(): Promise<Record<string, any>> {
  //   return http.getList('config/config-base/v1/list').then(({ models = [] }) => {
  //     return (models as Array<{ configKey: string; configValue: any }>).reduce((obj, curr) => {
  //       obj[curr['configKey'] as keyof SiteSettings] = curr['configValue'];
  //       return obj;
  //     }, {} as Record<string, any>);
  //   });
  // },

  /**
   * 获取用户配置
   */
  // getUserInfo(): Promise<Partial<UserInfo>> {
  //   return http.get('auth/master/v1/get').then(({ model = {} }) => model);
  // },

  /** 获取主题模块 */
  getModules(): Promise<ModuleConfig[]> {
    return http.getList('admin/modules/admins').then(({ models = [] }) => models);
  },
};
