import merge from 'lodash.merge';
import { trailingSlash } from '@/utils/path';
import { getDefaultMenus } from '@/config/menuCofnigs';
import { menu as menuIcon } from '@/assets/icons';

// Types
import { SettingsFunctions, SiteSettings } from 'types/functions/settings';

export const globalSettings: SiteSettings = {
  domain: '',
  staticDir: 'static/',
  siderMenus: getDefaultMenus(),
};

const settingsFunctions: SettingsFunctions = {
  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 配置的域名（末尾带有"/")
   */
  getDomain() {
    return trailingSlash(globalSettings.domain);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 相对于配置域名的静态文件目录（末尾带有"/"）
   */
  getStaticDir() {
    return trailingSlash(globalSettings.staticDir);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * API 地址(v1)，如果不是http(s) 绝对路径，则会以当前域名为绝对路径
   */
  getApiPath() {
    return trailingSlash(process.env.baseUrl!) + 'api/plumemo-service/';
  },

  /**
   * @author Hubert
   * @since 2020-11-12
   * @version 0.0.1
   * 侧边栏菜单
   */
  getSiderMenus() {
    return globalSettings.siderMenus;
  },

  /**
   * @author Hubert
   * @since 2020-11-12
   * @version 0.0.1
   * 添加侧边栏菜单
   */
  addSiderMenus(menus, parentName) {
    if (parentName) {
      const parent = globalSettings.siderMenus.find((menu) => menu.name === parentName);
      // 只有 children 被定义了才能加
      if (parent && parent.children) {
        parent.children.push(...menus);
      }
    } else {
      menus.forEach((menu) => {
        if (!menu.icon) {
          // todo: 替换一个公用 icon
          menu.icon = menuIcon;
        }
      });
      globalSettings.siderMenus.push(...menus);
    }
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 设置网站配置
   */
  setSiteSettings(settings) {
    merge(globalSettings, settings);
  },
};

export default settingsFunctions;
