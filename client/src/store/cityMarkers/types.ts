import { IAdminCityMarker } from '@src/types/markers.types';

export interface ICityMarkersState {
  isLoading: boolean,
  data: IAdminCityMarker[],
  loadingItems: string[],
}
