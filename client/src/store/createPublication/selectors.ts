import { RootState } from '@src/store';

export const selectCreatePublicationLoading = (state: RootState): boolean => state.createPublication.isLoading;
