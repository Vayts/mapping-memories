import { RootState } from '@src/store';
import { IPublication } from '@src/types/publication.types';

export const selectInterviews = (state: RootState): IPublication[] => state.interviews.data;
export const selectInterviewsLoading = (state: RootState): boolean => state.interviews.isLoading;
export const selectInterviewsLimit = (state: RootState): number => state.interviews.limit;
export const selectInterviewsSearchValue = (state: RootState): string => state.interviews.searchValue;
export const selectInterviewsHasMoreContent = (state: RootState): boolean => state.interviews.hasMoreContent;
export const selectFavoriteInterviews = (state: RootState): IPublication[] => state.interviews.favoriteInterviews;
