import { IMemorialMarker } from '@src/store/map/types';
import { Dispatch, SetStateAction } from 'react';

export interface IMemorialMarkerProps {
  marker: IMemorialMarker,
  activeMarker: IMemorialMarker | null,
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>,
  setCoords: (x: number, y: number, zoom?: number) => void;
}
