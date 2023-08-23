import React, { useCallback, useEffect, useState } from 'react';
import MapControls from '@src/pages/MapPage/MapControls/MapControls';
import { IMemorialMarker } from '@src/store/map/types';
import { MAP } from '@constants/map';
import { useAppDispatch } from '@src/hooks/hooks';
import { getMapInfoRequest } from '@src/store/map/actions';
import MapElem from '@src/pages/MapPage/MapElem/MapElem';
import * as S from './style';

const MapPage: React.FC = () => {
  const [map, setMap] = React.useState<any>(null);
  const [zoom, setZoom] = useState<number>(MAP.DEFAULT_ZOOM);
  const [bounds, setBounds] = useState<any | null>(null);
  const [activeMarker, setActiveMarker] = useState<IMemorialMarker | null>(null);
  const mapRef = React.useRef<any>(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getMapInfoRequest());
  }, []);
  
  const setCoords = useCallback((lat: number, lng: number, zoom = 10) => {
    mapRef.current.panTo({ lat, lng });
    setZoom(zoom);
  }, []);
  
  return (
    <S.MapPageWrapper>
      <MapControls
        setCoords={setCoords}
        setActiveMarker={setActiveMarker}
        zoom={zoom}
        bounds={bounds}
      />
      <MapElem
        map={map}
        mapRef={mapRef}
        setBounds={setBounds}
        setMap={setMap}
        zoom={zoom}
        setZoom={setZoom}
        setCoords={setCoords}
        activeMarker={activeMarker}
        setActiveMarker={setActiveMarker}
      />
    </S.MapPageWrapper>
  );
};

export default MapPage;
