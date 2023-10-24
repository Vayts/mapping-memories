import { ILocale } from '@src/types/locale.types';

export interface IPublication {
  _id: string,
  title: ILocale,
  description: ILocale,
  type: PublicationEnum,
  photo: string,
  createdAt: Date,
  isFavorite: boolean,
  index?: number;
  contentBlocks: Record<string, any>
}

export enum PublicationEnum {
  Interview = 'interview',
  ArtProject = 'artProject',
  SpecialProject = 'specialProject',
}
