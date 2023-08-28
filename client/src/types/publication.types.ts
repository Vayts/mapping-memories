import { ILocale } from '@src/types/types';

type PublicationType = 'interview' | 'artProject' | 'specialProject';

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
