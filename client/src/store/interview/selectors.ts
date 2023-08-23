import { RootState } from '@src/store';
import { IInterview } from '@src/types/interview.types';

export const selectAllInterviews = (state: RootState): IInterview[] => state.interview.interviews;

export const selectFavoriteInterviews = (state: RootState): IInterview[] => state.interview.favoriteInterviews;
