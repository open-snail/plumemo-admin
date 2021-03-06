import merge from 'lodash.merge';

// Types
import { LocaleFunctions, LocaleConfig } from 'types/functions/locale';

export const globalLocale: LocaleConfig = {
  default: 'en-US',
  supportLanguages: [
    {
      name: 'English',
      shortName: 'EN',
      icon: '🇺🇸',
      locale: 'en-US',
      alternate: 'en',
    },
    {
      name: '简体中文',
      shortName: '中',
      icon: '🇨🇳',
      locale: 'zh-CN',
    },
  ],
};

const localeFunctions: LocaleFunctions = {
  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取默认语言 locale
   */
  getDefaultLocale() {
    return globalLocale.default;
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取支持语言列表
   */
  getSupportLanguages() {
    return globalLocale.supportLanguages;
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 设置默认语言 locale
   */
  setDefaultLocale(locale) {
    const { locale: newLocale } =
      globalLocale.supportLanguages.find((lang) => lang.locale === locale || lang.alternate === locale) || {};
    if (newLocale && newLocale !== globalLocale.default) {
      globalLocale.default = newLocale;
    }
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加支持语言列表
   */
  addSupportLanguages(languages) {
    globalLocale.supportLanguages = globalLocale.supportLanguages.concat(languages);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 设置语言配置
   */
  setLocale(localeConfig) {
    merge(globalLocale, localeConfig);
  },
};

export default localeFunctions;
