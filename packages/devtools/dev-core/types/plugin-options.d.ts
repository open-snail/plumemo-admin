import { HookFunction, ThemeFunctions, LayoutFunctions, LocaleFunctions, SettingsFunctions } from './functions';

export interface PluginOptions
  extends Pick<ThemeFunctions, 'getCurrentTheme' | 'getThemes' | 'isDarkTheme'>,
    Pick<LayoutFunctions, 'hasWidget' | 'getWidgets' | 'hasTemplate' | 'getTemplates'>,
    Pick<
      LocaleFunctions,
      'getDefaultLocale' | 'getSupportLanguages' | 'addSupportLanguages' | 'setDefaultLocale' | 'setLocale'
    >,
    Pick<SettingsFunctions, 'getDomain' | 'getLogo' | 'getStaticDir' | 'getApiPath' | 'getCopyright' | 'getICP'> {
  hook: HookFunction;
}
