export type LocaleConfig = {
  default: string;
  supportLanguages: LangConfig[];
};

export type LangConfig = {
  name: string;
  shortName: string;
  locale: string;
  alternate?: string;
  fallback?: boolean;
};

export interface LocaleFunctions {
  getDefaultLocale(): string;
  getSupportLanguages(): LangConfig[];
  setDefaultLocale(locale: string): void;
  addSupportLanguages(languages: LangConfig | LangConfig[]): void;
  setLocale(locale: Partial<LocaleConfig>): void;
}
