import { IAdminMemorialType } from '@src/types/markers.types';

export interface IAdminMarkerTypesState {
  isLoading: boolean,
  data: IAdminMemorialType[],
  loadingItem: string[],
}
