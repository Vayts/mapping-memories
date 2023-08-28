import { ILocale } from '@src/types/types';

export interface ICreatePublicationMain {
  title: ILocale,
  description: ILocale,
  photo: File | null,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export type LocaleFieldsMain = 'title' | 'description'

export interface ICreatePublicationContentBlock {
  _id: string,
  type: string,
  errors: Record<string, any>,
  touched: Record<string, any>,
  content: Record<string, any>,
}

export interface IVideoContentBlock extends ICreatePublicationContentBlock{
  content: {
    link: string,
    description: ILocale
  }
}

export interface ITextContentBlock extends ICreatePublicationContentBlock{
  content: {
    text: ILocale
  }
}

export interface IPhotoContentBlock extends ICreatePublicationContentBlock{
  content: {
    photo: File | null,
    source: string,
    description: ILocale
  }
}

export interface IPdfContentBlock extends ICreatePublicationContentBlock{
  content: {
    file: File | null;
  }
}

export interface ICreatePublicationMainDTO {
  title: ILocale
  description: ILocale,
  photo: string,
}

export interface IContentBlockDto {
  _id: string,
  type: string,
  content: Record<string, any>
}

export interface ICreatePublicationDTO {
  photos: File[],
  mainInfo: ICreatePublicationMainDTO,
  contentBlocks: IContentBlockDto[],
}
