import { IPublication } from '@src/types/publication.types';

export interface IInterviewState {
  isLoading: boolean,
  isInSearch: boolean,
  data: IPublication[],
  favoriteInterviews: IPublication[],
  searchValue: string,
  limit: number,
  hasMoreContent: boolean,
}
