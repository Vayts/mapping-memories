import { IPublication } from '@src/types/publication.types';

export interface IPublicationState {
  favoritePublications: IPublication[],
  isLoading: boolean,
  loadMoreLoading: boolean,
  limit: number,
  hasMoreContent: boolean,
}
