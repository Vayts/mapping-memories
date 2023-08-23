import { RootState } from '@src/store';

export const selectCreateInterviewLoading = (state: RootState): boolean => state.createInterview.isLoading;
