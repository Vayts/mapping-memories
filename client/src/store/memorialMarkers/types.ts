import { IAdminMemorialMarker, IMemorialMarker } from '@src/types/markers.types';

export interface IMemorialMarkersState {
  isLoading: boolean,
  data: IAdminMemorialMarker[],
  loadingItems: string[],
  isAddEditCompleted: boolean,
  currentMemorial: IMemorialMarker | null,
}
