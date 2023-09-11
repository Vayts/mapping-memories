import { RootState } from '@src/store';
import { IAdminCityMarker } from '@src/types/markers.types';

export const selectIsCityMarkersLoading = (state: RootState): boolean => state.cityMarkers.isLoading;
export const selectCityLoadingItems = (state: RootState): string[] => state.cityMarkers.loadingItems;
export const selectAdminCityMarkers = (state: RootState): IAdminCityMarker[] => state.cityMarkers.data;
