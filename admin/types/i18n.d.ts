import { Path, Locale, Values, TranslateResult } from 'vue-i18n';

declare module 'vue-i18n' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface IVueI18n {
    tv(key: Path, fallbackStr: string, locale?: Locale, values?: Values): TranslateResult;
  }
}
