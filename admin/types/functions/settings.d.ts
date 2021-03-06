export type Menu = {
  name: string;
  title: string;
  icon?: string;
  children?: SubMenu[];
};

export type SubMenu = {
  name: string;
  title: string;
  icon?: string;
};

export type SiteSettings = {
  domain: string;
  staticDir: string;
  siderMenus: Menu[];
};

export interface SettingsFunctions {
  getDomain(): SiteSettings['domain'];
  getStaticDir(): SiteSettings['staticDir'];
  getSiderMenus(): SiteSettings['siderMenus'];
  getApiPath(): string;
  addSiderMenus(menus: Menu[], parentName?: string): void;
  setSiteSettings(settings: Partial<SiteSettings>): void;
}
