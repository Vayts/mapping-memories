import { RootState } from '@src/store';
import { IAdminMemorialType } from '@src/types/markers.types';

export const selectIsMemorialTypesLoading = (state: RootState): boolean => state.memorialTypes.isLoading;

export const selectAdminMemorialTypesLoadingItems = (state: RootState): string[] => state.memorialTypes.loadingItems;

export const selectAdminMemorialTypes = (state: RootState): IAdminMemorialType[] => state.memorialTypes.data;
