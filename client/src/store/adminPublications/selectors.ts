import { RootState } from '@src/store';
import { IAdminPublication } from '@src/types/publication.types';

export const selectIsAdminPublicationsLoading = (state: RootState): boolean => state.adminPublications.isLoading;

export const selectAdminPublications = (state: RootState): IAdminPublication[] => state.adminPublications.data;

export const selectAdminPublicationsSearch = (state: RootState): string => state.adminPublications.searchValue;

export const selectLoadingPublication = (state: RootState): string[] => state.adminPublications.isLoadingItems;
