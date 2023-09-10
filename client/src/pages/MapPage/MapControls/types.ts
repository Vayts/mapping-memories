import { Dispatch, SetStateAction } from 'react';
import { IMemorialMarker } from '@src/types/markers.types';
import LatLngBounds = google.maps.LatLngBounds;

export interface IMapControlsProps {
  setCoords: (lat: number, lng: number) => void;
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>;
  zoom: number;
  bounds: LatLngBounds | null;
}

export interface IMapControlsStyle {
  isOpen: boolean,
}
