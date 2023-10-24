import { IPublication } from '@src/types/publication.types';

export interface IPublicationRowProps {
  publication: IPublication,
}

export interface IPublicationRowStyle {
  isFavorite: boolean,
}
