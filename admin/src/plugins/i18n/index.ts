import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { hasOwn } from '@vue-async/utils';
import { hook, globalLocale, localeFuncs } from '@/includes/functions';

// Locales
import enUS from '@/lang/en-US';
import { APP_LANGUAGE } from '@/config/proLayoutConfigs';
import { genLocaleConfig } from '../router/utils';

// Types
import { Route } from 'vue-router';
import { Plugin } from '@nuxt/types';
import { LangConfig } from 'types/functions';

Vue.use(VueI18n);

/**
 * 扩展方法
 * tv(key, default, locale) 如果 key 的翻译没有则为 fallbackStr, 如果 fallbackStr 没有，则为 key
 */
Object.defineProperties(VueI18n.prototype, {
  tv: {
    value: function (key: string, fallbackStr: string, locale?: string) {
      return (this.t && this.te ? (this.te(key, locale) ? this.t(key, locale) : fallbackStr) : fallbackStr) || key;
    },
    writable: false,
    enumerable: true,
    configurable: true,
  },
});

/**
 * 扩展方法添加到 Vue 实例中
 */
Object.defineProperties(Vue.prototype, {
  $tv: {
    value: function (key: VueI18n.Path, fallbackStr: string, locale?: VueI18n.Locale): VueI18n.TranslateResult {
      const i18n = this.$i18n;
      return i18n.tv(key, fallbackStr, locale);
    },
    writable: false,
    enumerable: true,
    configurable: true,
  },
});

const plugin: Plugin = async (cxt) => {
  const { app } = cxt;

  let defaultLocale = Vue.ls.get(APP_LANGUAGE, localeFuncs.getDefaultLocale());
  const fallbackLocale = 'en-US';
  const messages: Dictionary<any> = {
    'en-US': enUS, // fallback locale
  };
  const hasDocument = typeof document !== 'undefined';
  const { hasLocale, preferredLocale } = genLocaleConfig(globalLocale);

  if (!defaultLocale || !hasLocale(defaultLocale)) {
    defaultLocale = preferredLocale;
  }

  //对内置语言文件修改（fallbackLocale）
  await hook('i18n_message_update').exec(messages[fallbackLocale], fallbackLocale);
  // 自定义多语言消息(同步)
  await hook('i18n-messages').exec(messages);

  const i18n = new VueI18n({
    locale: defaultLocale,
    fallbackLocale,
    messages,
    silentFallbackWarn: true,
  });

  new Vue({
    created() {
      this.$watch(
        () => i18n.locale,
        (locale: string) => {
          if (!i18n.availableLocales.includes(locale)) {
            loadLanguageAsync(locale).catch(() => {
              // ate by dog
            });
          } else {
            setLocale(locale);
          }
        },
        { immediate: true },
      );
    },
  });

  function setLocale(locale: string) {
    i18n.locale = locale;
    Vue.ls.set(APP_LANGUAGE, locale);
    if (hasDocument) {
      document.querySelector('html')!.setAttribute('lang', locale);
    }
    return locale;
  }

  /**
   * 动态加载语言包，默认打包语言包含zh-CN, en-US
   * @param {string} locale language code
   * @returns {Promise<string>} language code
   */
  function loadLanguageAsync(locale: string): Promise<string> {
    if (!hasOwn(i18n.messages, locale)) {
      const { locale: newLocale } =
        localeFuncs.getSupportLanguages().find((l: LangConfig) => locale === l.alternate || locale === l.locale) || {};

      if (newLocale) {
        return import(/* webpackChunkName: "locale-[request]" */ `@/lang/${newLocale}`)
          .then((msgs) => {
            const { default: message, dateTimeFormat, numberFormat } = msgs;

            //对内置语言文件修改（fallback其它的）
            return hook('i18n_message_update')
              .exec(message, newLocale)
              .then(() => {
                i18n.setLocaleMessage(newLocale, message);
                // setting datetime & number format
                dateTimeFormat && i18n.setDateTimeFormat(newLocale, dateTimeFormat);
                numberFormat && i18n.setNumberFormat(newLocale, numberFormat);

                return setLocale(newLocale);
              });
          })
          .catch((err) => {
            // lang目录下没有配置该语言
            if (err.code === 'MODULE_NOT_FOUND') {
              // 自定义多语言消息(异步)
              return hook('i18n-messages-async')
                .filter(newLocale, i18n)
                .then((locale) => {
                  return setLocale(locale);
                });
            }
            // 否则直接忽略并切换到新语言，让 i18n 处理 fallback 。
            return setLocale(newLocale);
          });
      } else {
        return Promise.reject(new Error(`Language "${locale}" is not support!`)); // 不在 SupportLanguages 列表中
      }
    }
    return Promise.resolve(i18n.locale !== locale ? locale : setLocale(locale)); // 当前配置已在在，直接切换
  }

  // 路由变化后的语言变化
  app.router!.beforeEach((to: Route, from: Route, next: any) => {
    let locale: string;
    if ((locale = to.params.lang || (to.query.lang as string))) {
      // 修正 params/query 语言
      if (!hasLocale(locale)) {
        if (to.params.lang) {
          to.params.lang = preferredLocale;
        } else {
          to.query.lang = preferredLocale;
        }
        next(to); // 重新进入路由到 else 中
      } else {
        loadLanguageAsync(locale)
          .catch(() => {}) // 忽略错误
          .finally(() => next());
      }
    } else {
      next();
    }
  });

  cxt.app.i18n = i18n;
  cxt.$i18n = i18n as any; // 添加 i18n 到 Context, todo: type error
};

export default plugin;
