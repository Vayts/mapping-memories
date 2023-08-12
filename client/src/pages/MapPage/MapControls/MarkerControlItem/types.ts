import { IMemorialMarker } from '@src/store/map/types';
import { Dispatch, SetStateAction } from 'react';

export interface IMarkerControllerItemProps {
  marker: IMemorialMarker,
  setCoords: (lat: number, lng: number, zoom: number) => void,
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>,
}
