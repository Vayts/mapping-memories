import { ILocale, LocaleType } from '@src/types/types';

export interface ICreateInterviewMain {
  title: ILocale,
  description: ILocale,
  photo: File | null,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export type LocaleFieldsMain = 'title' | 'description'

export interface ICreateInterviewContentBlock {
  _id: string,
  type: string,
  errors: Record<string, any>,
  touched: Record<string, any>,
  content: Record<string, any>,
}

export interface IVideoContentBlock extends ICreateInterviewContentBlock{
  content: {
    link: string,
    description: ILocale
  }
}

export interface ITextContentBlock extends ICreateInterviewContentBlock{
  content: {
    text: ILocale
  }
}

export interface IPhotoContentBlock extends ICreateInterviewContentBlock{
  content: {
    photo: File | null,
    source: string,
    description: ILocale
  }
}

export interface ICreateInterviewMainDTO {
  title: ILocale
  description: ILocale,
  photo: string,
}

export interface IContentBlockDto {
  _id: string,
  type: string,
  content: Record<string, any>
}

export interface ICreateInterviewDTO {
  photos: File[],
  mainInfo: ICreateInterviewMainDTO,
  contentBlocks: IContentBlockDto[],
}
