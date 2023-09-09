import { Dispatch, SetStateAction } from 'react';
import { IMemorialMarker } from '@src/types/markers.types';

export interface IMarkerControllerItemProps {
  marker: IMemorialMarker,
  setCoords: (lat: number, lng: number, zoom: number) => void,
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>,
}
