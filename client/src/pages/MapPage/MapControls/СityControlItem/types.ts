import { ICityMarker } from '@src/types/markers.types';

export interface ICityControlItemProps {
  marker: ICityMarker,
  setCoords: (lat: number, lng: number, zoom: number) => void,
}
