/**
 * 传递到主题入口函数参数 options 上的属性和方法
 */

import hook from './functions/hooks';
import themeFunctions from './functions/theme';
import localeFunctions from './functions/locale';
import layoutFunctions from './functions/layout';
import settingsFunctions from './functions/settings';

// Types
import { ThemeOptions } from 'types/theme-options';

const { getCurrentTheme, getThemes, isDarkTheme, setDarkTheme, setThemes } = themeFunctions;
const {
  hasLayout,
  getLayouts,
  addLayout,
  addLayouts,
  hasWidget,
  getWidgets,
  addWidgets,
  hasTemplate,
  getTemplates,
  addTemplate,
  addTemplates,
  removeTemplates,
} = layoutFunctions;
const { getDefaultLocale, getSupportLanguages, addSupportLanguages, setDefaultLocale, setLocale } = localeFunctions;
const { getDomain, getLogo, getStaticDir, getApiPath, getCopyright, getICP } = settingsFunctions;

// addRoutes 在外部添加
const themeOptions: Omit<ThemeOptions, 'addRoutes'> = {
  hook,
  getCurrentTheme,
  getThemes,
  isDarkTheme,
  setDarkTheme,
  setThemes,
  getDefaultLocale,
  getSupportLanguages,
  addSupportLanguages,
  setDefaultLocale,
  setLocale,
  hasLayout,
  getLayouts,
  addLayout,
  addLayouts,
  hasWidget,
  getWidgets,
  addWidgets,
  hasTemplate,
  getTemplates,
  addTemplate,
  addTemplates,
  removeTemplates,
  getDomain,
  getLogo,
  getStaticDir,
  getApiPath,
  getCopyright,
  getICP,
};

export default themeOptions;
