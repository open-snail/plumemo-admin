import { MetaInfo } from 'vue-meta';

export type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  anchor: string;
  error: string;
  info: string;
  success: string;
  warning: string;
  [key: string]: string;
};

export type ModuleConfig = {
  moduleName: string;
  entry: string;
  styles?: string | string[];
  args?: Record<string, any>;
};

export interface SiteApi {
  getConfigs(): Promise<Record<string, any>>;
  getSEOConfigs(): Promise<NonNullable<MetaInfo['meta']>>;
  getThemes(): Promise<{ dark: boolean; themes: Partial<Theme> }>;
  getThemeModule(): Promise<ModuleConfig>;
  getPluginModules(): Promise<ModuleConfig[]>;
}
