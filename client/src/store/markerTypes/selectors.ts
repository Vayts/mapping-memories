import { RootState } from '@src/store';
import { IAdminMemorialMarker, IAdminMemorialType } from '@src/types/markers.types';

export const selectIsMarkersLoading = (state: RootState): boolean => state.adminMarkers.isLoading;

export const selectAdminMemorialMarkers = (state: RootState): IAdminMemorialMarker[] => state.adminMarkers.memorialMarkers;

export const selectAdminMemorialTypes = (state: RootState): IAdminMemorialType[] => state.adminMarkers.memorialTypes;
