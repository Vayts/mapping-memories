import { ILocale } from '@src/types/types';

export interface ICreateInterviewMain {
  title: ILocale,
  description: ILocale,
  mainPhoto: File | null,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export type LocaleFieldsMain = 'title' | 'description'

export type LocaleFieldsContent = 'description';

export interface ICreateRecipeContentBlock {
  _id: string,
  type: string,
  errors: Record<string, any>,
  touched: Record<string, any>,
  content: Record<string, any>,
}

export interface IVideoContentBlock extends ICreateRecipeContentBlock{
  content: {
    link: string,
    description: {
      uk: string,
      en: string,
    },
  }
}
