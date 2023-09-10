import { IPublication, PublicationType } from '@src/types/publication.types';

export interface IPublicationState {
  currentPublicationType: '' | PublicationType,
  isLoading: boolean,
  isInSearch: boolean,
  data: IPublication[],
  favoritePublication: IPublication[],
  searchValue: string,
  limit: number,
  hasMoreContent: boolean,
}
