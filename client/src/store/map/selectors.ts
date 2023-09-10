import { RootState } from '@src/store';
import { IMarkerType, IMemorialMarker, ICityMarker } from '@src/types/markers.types';

export const selectMemorialMarkers = (state: RootState): IMemorialMarker[] => state.map.markers.memorials;
export const selectCityMarkers = (state: RootState): ICityMarker[] => state.map.markers.cities;
export const selectTypeMarkers = (state: RootState): IMarkerType[] => state.map.types;
export const selectActiveTypes = (state: RootState): string[] => state.map.activeTypes;
export const selectMapIsLoading = (state: RootState): boolean => state.map.isLoading;
