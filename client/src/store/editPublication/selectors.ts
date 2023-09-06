import { RootState } from '@src/store';
import { IPublication } from '@src/types/publication.types';

export const selectPublicationForEdit = (state: RootState): IPublication => state.editPublication.publication as IPublication;

export const selectEditPublicationLoading = (state: RootState): boolean => state.editPublication.isLoading;

export const selectPublicationHasBeenEdited = (state: RootState): boolean => state.editPublication.hasBeenEdited;
