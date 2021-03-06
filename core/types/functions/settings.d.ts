export type SiteSettings = {
  staticDir: string;
  [key: string]: any;
};

export interface SettingsFunctions {
  getSettingByKey<T = string | undefined>(key: string, defaultValue?: NonNullable<T>): T;
  getDomain(): string;
  getStaticDir(): string;
  getApiPath(): string;
  getCopyright(): string;
  getICP(): string;
  getLogo(): { imgUrl?: string; text?: string };
  setSiteSettings(settings: Record<string, any>): void;
}
