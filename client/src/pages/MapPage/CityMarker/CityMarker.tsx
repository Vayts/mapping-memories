import React from 'react';
import { Marker } from '@react-google-maps/api';
import { ICityMarkerProps } from '@src/pages/MapPage/CityMarker/types';

const CityMarker: React.FC<ICityMarkerProps> = (
  {
    setCoords,
    marker,
  },
) => {
  const goToCoords = () => {
    setCoords(marker.lat, marker.lng);
  };
  
  return (
    <>
      <Marker
        onClick={goToCoords}
        position={{ lat: marker.lat, lng: marker.lng }}
        icon={{ url: marker.icon }}
      >
        7
      </Marker>
    </>
  );
};

export default CityMarker;
