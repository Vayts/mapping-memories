import { RootState } from '@src/store';
import { IAdminMemorialMarker, IMemorialMarker } from '@src/types/markers.types';

export const selectIsMemorialMarkersLoading = (state: RootState): boolean => state.cityMarkers.isLoading;
export const selectMemorialMarkersLoadingItems = (state: RootState): string[] => state.memorialMarkers.loadingItems;
export const selectCurrentMemorial = (state: RootState): IMemorialMarker | null => state.memorialMarkers.currentMemorial;
export const selectAdminMemorialMarkers = (state: RootState): IAdminMemorialMarker[] => state.memorialMarkers.data;
export const selectIsAddEditCompleted = (state: RootState): boolean => state.memorialMarkers.isAddEditCompleted;
