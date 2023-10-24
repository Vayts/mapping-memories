import { IMemorialMarker } from '@src/types/markers.types';

export interface IMemorialsState {
  isLoading: boolean,
  currentMemorial: IMemorialMarker | null,
  loadingItems: string[],
}
