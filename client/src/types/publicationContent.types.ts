import { ILocale } from '@src/types/locale.types';

export interface IPublicationContent {
  _id: string,
  type: string,
  content: Record<string, any>
}

export interface IPublicationPhotoContent extends IPublicationContent{
  content: {
    photo: string,
    source: string,
    description: ILocale
  }
}

export interface IPublicationTextContent extends IPublicationContent{
  content: {
    text: ILocale
  }
}

export interface IPublicationVideoContent extends IPublicationContent {
  content: {
    link: string,
    description: ILocale
  }
}

export interface IPublicationPdfContent extends IPublicationContent {
  content: {
    file: string;
  }
}
