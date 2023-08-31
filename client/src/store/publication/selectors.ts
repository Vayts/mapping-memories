import { RootState } from '@src/store';
import { IPublication } from '@src/types/publication.types';

export const selectCurrentPublication = (state: RootState): IPublication | null => state.currentPublication.currentPublication;

export const selectCurrentPublicationIsLoading = (state: RootState): boolean => state.currentPublication.isLoading;

export const selectAsideData = (state: RootState): IPublication[] => state.currentPublication.asideData;

export const selectAsideDataIsLoading = (state: RootState): boolean => state.currentPublication.asideIsLoading;
