import { ILocale } from '@src/types/types';

export type PublicationType = 'interview' | 'artProject' | 'specialProject';

export interface IPublication {
  _id: string,
  title: ILocale,
  description: ILocale,
  type: PublicationType,
  photo: string,
  createdAt: Date,
  isFavorite: boolean,
  content: Record<string, any>
}

export enum PublicationEnum {
  interview = 'interview',
  artProject = 'artProject',
  specialProject = 'specialProject',
}
