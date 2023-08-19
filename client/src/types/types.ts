export type LocaleType = 'en' | 'uk'

export interface ILocale {
  uk: string,
  en: string,
}

export interface ILanguageObject<T> {
  [key: string]: T;
}
