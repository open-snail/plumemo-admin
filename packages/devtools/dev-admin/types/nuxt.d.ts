import VueI18n, { IVueI18n } from 'vue-i18n';
import { AxiosInstance, AxiosStatic } from 'axios';
import { CategoryApi, TagApi, ArticleApi } from './datas';

declare module '@nuxt/types' {
  interface Context {
    axios: AxiosStatic;
    $http: AxiosInstance;
    $i18n: VueI18n & IVueI18n;
    categoryApi: CategoryApi;
    tagApi: TagApi;
    articleApi: ArticleApi;
  }
}
