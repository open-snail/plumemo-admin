/**
 * 挂载到 Vue.prototype 上，所有的组件（包括子模块主题和插件）都可以能过 this 去调用
 */

// functions
import hook from './functions/hooks';
import localeFunctions from './functions/locale';
import settingsFunctions from './functions/settings';

// apis
import { categoryApi, tagApi, articleApi } from './datas';

// Types
import { VueExtraPrototypes } from 'types/vue';

const { getDefaultLocale, getSupportLanguages, addSupportLanguages, setDefaultLocale, setLocale } = localeFunctions;
const { getDomain, getStaticDir, getApiPath, getSiderMenus } = settingsFunctions;

const prototypes: VueExtraPrototypes = {
  hook,
  getDefaultLocale,
  getSupportLanguages,
  addSupportLanguages,
  setDefaultLocale,
  setLocale,
  getDomain,
  getStaticDir,
  getApiPath,
  getSiderMenus,
  categoryApi,
  tagApi,
  articleApi,
};

export default prototypes;
