/**
 * 挂载到 Vue.prototype 上，所有的组件（包括子模块主题和插件）都可以能过 this 去调用
 */

// functions
import hook from './functions/hooks';
import themeFunctions from './functions/theme';
import localeFunctions from './functions/locale';
import layoutFunctions from './functions/layout';
import settingsFunctions from './functions/settings';

// apis
import { categoryApi, tagApi, articleApi, userApi } from './datas';

// Types
import { VueExtraPrototypes } from 'types/vue';

const { getCurrentTheme, getThemes, isDarkTheme } = themeFunctions;
const { hasWidget, getWidgets } = layoutFunctions;
const { getDefaultLocale, getSupportLanguages, addSupportLanguages, setDefaultLocale, setLocale } = localeFunctions;
const { getDomain, getLogo, getStaticDir, getApiPath, getCopyright, getICP } = settingsFunctions;

const prototypes: VueExtraPrototypes = {
  hook,
  getCurrentTheme,
  getThemes,
  isDarkTheme,
  getDefaultLocale,
  getSupportLanguages,
  addSupportLanguages,
  setDefaultLocale,
  setLocale,
  hasWidget,
  getWidgets,
  getDomain,
  getLogo,
  getStaticDir,
  getApiPath,
  getCopyright,
  getICP,
  userApi,
  categoryApi,
  tagApi,
  articleApi,
};

export default prototypes;
