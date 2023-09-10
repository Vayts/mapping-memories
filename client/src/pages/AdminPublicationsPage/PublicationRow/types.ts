import { IAdminPublication } from '@src/types/publication.types';

export interface IPublicationRowProps {
  publication: IAdminPublication,
}

export interface IPublicationRowStyle {
  isFavorite: boolean,
}
