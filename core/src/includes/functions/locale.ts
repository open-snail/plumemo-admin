import merge from 'lodash.merge';

// Types
import { LocaleFunctions, LocaleConfig } from 'types/functions/locale';

export const globalLocale: LocaleConfig = {
  default: 'en-US',
  supportLanguages: [
    {
      name: '简体中文',
      shortName: '中',
      locale: 'zh-CN',
      fallback: true,
    },
    {
      name: 'English',
      shortName: 'EN',
      locale: 'en-US',
      alternate: 'en',
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
    globalLocale.default = locale;
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
  setLocale(locale) {
    merge(globalLocale, locale);
  },
};

export default localeFunctions;
