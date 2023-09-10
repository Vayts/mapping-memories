import { RootState } from '@src/store';
import { IPublication, PublicationType } from '@src/types/publication.types';

export const selectPublications = (state: RootState): IPublication[] => state.publications.data;
export const selectPublicationsLoading = (state: RootState): boolean => state.publications.isLoading;
export const selectPublicationsLimit = (state: RootState): number => state.publications.limit;
export const selectPublicationsSearchValue = (state: RootState): string => state.publications.searchValue;
export const selectPublicationsHasMoreContent = (state: RootState): boolean => state.publications.hasMoreContent;
export const selectFavoritePublications = (state: RootState): IPublication[] => state.publications.favoritePublication;
export const selectCurrentPublicationType = (state: RootState): '' | PublicationType => state.publications.currentPublicationType;
export const selectIsInSearch = (state: RootState): boolean => state.publications.isInSearch;
