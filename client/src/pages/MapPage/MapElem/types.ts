import React, { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { IMemorialMarker } from '@src/types/markers.types';
import LatLngBounds = google.maps.LatLngBounds;

export interface IMapProps {
  map: any,
  setMap: React.Dispatch<any>,
  mapRef: MutableRefObject<any>,
  zoom: number,
  setZoom: React.Dispatch<number>,
  setCoords: (lat: number, lng: number) => void,
  activeMarker: IMemorialMarker | null,
  setActiveMarker: Dispatch<SetStateAction<IMemorialMarker | null>>,
  setBounds: React.Dispatch<LatLngBounds>,
}
