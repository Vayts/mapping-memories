import { RootState } from '@src/store';
import { ICityMarker, IMarkerType, IMemorialMarker } from '@src/store/map/types';

export const selectMemorialMarkers = (state: RootState): IMemorialMarker[] => state.map.markers.memorials;

export const selectCityMarkers = (state: RootState): ICityMarker[] => state.map.markers.cities;
export const selectTypeMarkers = (state: RootState): IMarkerType[] => state.map.types;
export const selectActiveTypes = (state: RootState): string[] => state.map.activeTypes;
