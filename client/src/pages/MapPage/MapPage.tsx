import React, { useCallback, useEffect, useState } from 'react';
import MapControls from '@src/pages/MapPage/MapControls/MapControls';
import { MAP } from '@constants/map';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import MapElem from '@src/pages/MapPage/MapElem/MapElem';
import { IMemorialMarker } from '@src/types/markers.types';
import { Loader } from '@src/components/Loader/Loader';
import { selectIsAppLoading } from '@src/store/core/selectors';
import { getMapInfo } from '@src/store/map/thunks';
import { errorManager } from '@helpers/error.helper';
import * as S from './style';

const MapPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsAppLoading);
  const [map, setMap] = React.useState<any>(null);
  const [zoom, setZoom] = useState<number>(MAP.DEFAULT_ZOOM);
  const [bounds, setBounds] = useState<any | null>(null);
  const [activeMarker, setActiveMarker] = useState<IMemorialMarker | null>(null);
  const activeTypes = useAppSelector((state) => state.map.activeTypes);
  const mapRef = React.useRef<any>(null);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getMapInfo())
      .unwrap()
      .catch(errorManager);
  }, [activeTypes]);
  
  const setCoords = useCallback((lat: number, lng: number, zoom = 10) => {
    mapRef.current.panTo({ lat, lng });
    setZoom(zoom);
  }, []);
  
  return (
    <S.MapPageWrapper>
      {isLoading && <Loader/>}
      {!isLoading && (
        <>
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
        </>
      )}
    </S.MapPageWrapper>
  );
};

export default MapPage;
