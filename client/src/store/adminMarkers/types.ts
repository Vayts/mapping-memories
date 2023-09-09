import { IAdminCityMarker, IAdminMemorialMarker, IAdminMemorialType, IMemorialMarker } from '@src/types/markers.types';

export interface IAdminMarkersState {
  isLoading: boolean,
  cityMarkers: IAdminCityMarker[],
  memorialMarkers: IAdminMemorialMarker[],
  loadingItem: string[],
  memorialTypes: IAdminMemorialType[],
  currentMemorial: IMemorialMarker | null,
  isAddEditCompleted: boolean,
}
