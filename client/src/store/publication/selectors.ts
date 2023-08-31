import { RootState } from '@src/store';
import { IPublication } from '@src/types/publication.types';

export const selectCurrentPublication = (state: RootState): IPublication | null => state.currentPublication.currentPublication;
