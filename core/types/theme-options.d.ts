import { RouteConfig } from 'vue-router';
import { HookFunction, ThemeFunctions, LayoutFunctions, LocaleFunctions, SettingsFunctions } from './functions';

export interface ThemeOptions
  extends Pick<ThemeFunctions, 'getCurrentTheme' | 'getThemes' | 'isDarkTheme' | 'setDarkTheme' | 'setThemes'>,
    Pick<
      LayoutFunctions,
      | 'hasLayout'
      | 'getLayouts'
      | 'addLayout'
      | 'addLayouts'
      | 'hasWidget'
      | 'getWidgets'
      | 'addWidgets'
      | 'hasTemplate'
      | 'getTemplates'
      | 'addTemplate'
      | 'addTemplates'
      | 'removeTemplates'
    >,
    Pick<
      LocaleFunctions,
      'getDefaultLocale' | 'getSupportLanguages' | 'addSupportLanguages' | 'setDefaultLocale' | 'setLocale'
    >,
    Pick<SettingsFunctions, 'getDomain' | 'getLogo' | 'getStaticDir' | 'getApiPath' | 'getCopyright' | 'getICP'> {
  hook: HookFunction;
  addRoutes(routes: RouteConfig[], megreFn?: (oldRoutes: RouteConfig[], newRoutes: RouteConfig[]) => void): void;
}
