import { RouteConfig } from 'vue-router';
import { HookFunction, LocaleFunctions, SettingsFunctions } from './functions';

export interface ModuleOptions
  extends Pick<
      LocaleFunctions,
      'getDefaultLocale' | 'getSupportLanguages' | 'addSupportLanguages' | 'setDefaultLocale' | 'setLocale'
    >,
    Pick<SettingsFunctions, 'getDomain' | 'getStaticDir' | 'getApiPath' | 'getSiderMenus' | 'addSiderMenus'> {
  hook: HookFunction;
  addRoutes(routes: RouteConfig[], megreFn?: (oldRoutes: RouteConfig[], newRoutes: RouteConfig[]) => void): void;
}
