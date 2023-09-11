import { RootState } from '@src/store';
import { IAdminMemorialMarker, IAdminMemorialType, IMemorialMarker } from '@src/types/markers.types';

export const selectIsMarkersLoading = (state: RootState): boolean => state.adminMarkers.isLoading;

export const selectIsAddEditCompleted = (state: RootState): boolean => state.adminMarkers.isAddEditCompleted;

export const selectCurrentMemorial = (state: RootState): IMemorialMarker | null => state.adminMarkers.currentMemorial;

export const selectAdminMemorialMarkers = (state: RootState): IAdminMemorialMarker[] => state.adminMarkers.memorialMarkers;

export const selectAdminMemorialTypes = (state: RootState): IAdminMemorialType[] => state.adminMarkers.memorialTypes;
