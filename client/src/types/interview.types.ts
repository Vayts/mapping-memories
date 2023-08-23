import { ILocale } from '@src/types/types';

export interface IInterview {
  _id: string,
  title: ILocale,
  description: ILocale,
  photo: string,
  createdAt: Date,
  isFavorite: boolean,
  content: Record<string, any>
}
