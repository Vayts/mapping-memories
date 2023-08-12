import { ICityMarker } from '@src/store/map/types';

export interface ICityMarkerProps {
  setCoords: (x: number, y: number) => void;
  marker: ICityMarker,
}
