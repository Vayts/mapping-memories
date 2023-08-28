import { IInterview } from '@src/types/interview.types';

export interface IInterviewState {
  isLoading: boolean,
  isInSearch: boolean,
  data: IInterview[],
  favoriteInterviews: IInterview[],
  searchValue: string,
  limit: number,
  hasMoreContent: boolean,
}
