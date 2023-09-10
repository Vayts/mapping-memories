import { ICityMarker } from '@src/types/markers.types';

export interface ICityMarkerProps {
  setCoords: (x: number, y: number) => void;
  marker: ICityMarker,
}
