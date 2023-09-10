import { RootState } from '@src/store';
import { IAdminCityMarker, IAdminMemorialMarker, IAdminMemorialType, IMemorialMarker } from '@src/types/markers.types';

export const selectIsMarkersLoading = (state: RootState): boolean => state.adminMarkers.isLoading;

export const selectIsAddEditCompleted = (state: RootState): boolean => state.adminMarkers.isAddEditCompleted;

export const selectCurrentMemorial = (state: RootState): IMemorialMarker | null => state.adminMarkers.currentMemorial;

export const selectAdminCityMarkers = (state: RootState): IAdminCityMarker[] => state.adminMarkers.cityMarkers;

export const selectAdminMemorialMarkers = (state: RootState): IAdminMemorialMarker[] => state.adminMarkers.memorialMarkers;

export const selectAdminMemorialTypes = (state: RootState): IAdminMemorialType[] => state.adminMarkers.memorialTypes;
