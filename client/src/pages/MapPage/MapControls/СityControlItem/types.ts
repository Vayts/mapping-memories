import { ICityMarker } from '@src/store/map/types';

export interface ICityControlItemProps {
  marker: ICityMarker,
  setCoords: (lat: number, lng: number, zoom: number) => void,
}
