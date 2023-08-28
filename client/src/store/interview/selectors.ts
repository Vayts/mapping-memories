import { RootState } from '@src/store';
import { IInterview } from '@src/types/interview.types';

export const selectInterviews = (state: RootState): IInterview[] => state.interviews.data;
export const selectInterviewsLoading = (state: RootState): boolean => state.interviews.isLoading;
export const selectInterviewsLimit = (state: RootState): number => state.interviews.limit;
export const selectInterviewsSearchValue = (state: RootState): string => state.interviews.searchValue;
export const selectInterviewsHasMoreContent = (state: RootState): boolean => state.interviews.hasMoreContent;
export const selectFavoriteInterviews = (state: RootState): IInterview[] => state.interviews.favoriteInterviews;
//
// export const selectAllInterviewPage = (state: RootState): number => state.allInterview.page;
//
// export const selectAllInterviewLimit = (state: RootState): number => state.allInterview.limit;
