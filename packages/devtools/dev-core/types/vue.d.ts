import { AxiosStatic } from 'axios';
import { IVueI18n } from 'vue-i18n';
import { CategoryApi, TagApi, ArticleApi, UserApi } from './datas';
import {
  HookFunction,
  HttpInstance,
  ThemeFunctions,
  LayoutFunctions,
  LocaleFunctions,
  SettingsFunctions,
} from './functions';

export interface VueExtraPrototypes
  extends Pick<ThemeFunctions, 'getCurrentTheme' | 'getThemes' | 'isDarkTheme'>,
    Pick<LayoutFunctions, 'hasWidget' | 'getWidgets'>,
    Pick<
      LocaleFunctions,
      'getDefaultLocale' | 'getSupportLanguages' | 'addSupportLanguages' | 'setDefaultLocale' | 'setLocale'
    >,
    Pick<SettingsFunctions, 'getDomain' | 'getLogo' | 'getStaticDir' | 'getApiPath' | 'getCopyright' | 'getICP'> {
  hook: HookFunction;
  categoryApi: CategoryApi;
  tagApi: TagApi;
  articleApi: ArticleApi;
  userApi: UserApi;
}

declare module 'vue/types/vue' {
  interface Vue extends VueExtraPrototypes {
    axios: AxiosStatic;
    $http: HttpInstance;
    $tv: IVueI18n['tv'];
  }

  interface VueConstructor {
    axios: AxiosStatic;
    $http: HttpInstance;
  }
}
