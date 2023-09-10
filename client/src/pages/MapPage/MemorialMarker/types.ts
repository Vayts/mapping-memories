import { Dispatch, SetStateAction } from 'react';
import { IMemorialMarker } from '@src/types/markers.types';

export interface IMemorialMarkerProps {
  marker: IMemorialMarker,
  activeMarker: IMemorialMarker | null,
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>,
  setCoords: (x: number, y: number, zoom?: number) => void;
}
