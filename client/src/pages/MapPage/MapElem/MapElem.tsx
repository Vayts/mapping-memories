import * as process from 'process';
import React, { memo, ReactNode, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectActiveTypes, selectCityMarkers, selectMapIsLoading, selectMemorialMarkers } from '@src/store/map/selectors';
import MemorialMarker from '@src/pages/MapPage/MemorialMarker/MemorialMarker';
import CityMarker from '@src/pages/MapPage/CityMarker/CityMarker';
import { MAP } from '@constants/map';
import { Loader } from '@src/components/Loader/Loader';
import { mapRequestEnd } from '@src/store/map/reducer';
import { IMapProps } from './types';
import { defaultTheme } from './MapTheme';

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 60px)',
};

const center = {
  lat: MAP.DEFAULT_LAT,
  lng: MAP.DEFAULT_LNG,
};

const defaultOptions = {
  styles: defaultTheme,
  mapTypeControl: true,
  clickableIcons: false,
  fullscreenControl: false,
  mapTypeControlOptions: {
    position: 7.0,
  },
  maxZoom: 17,
  minZoom: 3,
};

const MapElem: React.FC<IMapProps> = (props) => {
  const {
    setMap,
    map,
    mapRef,
    setZoom,
    zoom,
    setCoords,
    activeMarker,
    setActiveMarker,
    setBounds,
  } = props;
  const memorialMarkers = useAppSelector(selectMemorialMarkers);
  const isLoading = useAppSelector(selectMapIsLoading);
  const cityMarkers = useAppSelector(selectCityMarkers);
  const activeTypes = useAppSelector(selectActiveTypes);
  const { isLoaded } = useJsApiLoader({
    id: '845a623558bc42e2',
    googleMapsApiKey: process.env.GOOGLE_MAP_API as string,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (map) {
      setTimeout(() => {
        setZoom(MAP.DEFAULT_ZOOM);
      }, 200);
    }
  }, [map]);
  
  const handleZoomChanged = () => {
    if (mapRef?.current) {
      setZoom(mapRef.current.getZoom());
      const bounds = mapRef.current.getBounds();
      setBounds(bounds);
    }
  };
  
  const handlerDrag = () => {
    const bounds = mapRef.current.getBounds();
    setBounds(bounds);
  };
  
  useEffect(() => {
    handleZoomChanged();
  }, [activeMarker]);
  
  const onLoad = React.useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    mapRef.current = map;
    mapRef.current.addListener('zoom_changed', handleZoomChanged);
    setMap(map);
    dispatch(mapRequestEnd());
  }, []);
  
  const onUnmount = React.useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);
  
  const generateMarkers = useCallback((zoom: number): ReactNode => {
    if (zoom <= MAP.CITY_ZOOM) {
      return cityMarkers.map((item) => {
        return (
          <CityMarker
            key={item._id}
            marker={item}
            setCoords={setCoords}
          />
        );
      });
    }
    return memorialMarkers.map((item) => {
      return (
        <MemorialMarker
          key={item._id}
          marker={item}
          activeMarker={activeMarker}
          setActiveMarker={setActiveMarker}
          setCoords={setCoords}
        />
      );
    });
  }, [zoom, activeMarker, activeTypes, memorialMarkers]);
  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onBoundsChanged={handlerDrag}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={defaultOptions}
      onDrag={handlerDrag}
    >
      {isLoading && <Loader size={70}/>}
      {generateMarkers(zoom)}
    </GoogleMap>
  ) : <></>;
};

export default memo(MapElem);
