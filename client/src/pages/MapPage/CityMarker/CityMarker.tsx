import React from 'react';
import { Marker } from '@react-google-maps/api';
import { ICityMarkerProps } from '@src/pages/MapPage/CityMarker/types';
import { STATIC_HREF } from '@constants/app';

const CityMarker: React.FC<ICityMarkerProps> = (
  {
    setCoords,
    marker,
  },
) => {
  const { lat, lng, icon } = marker;
  
  const goToCoords = () => {
    setCoords(lat, lng);
  };
  
  return (
    <>
      <Marker
        onClick={goToCoords}
        position={{ lat, lng }}
        icon={{ url: `${STATIC_HREF}/${icon}` }}
      >
        7
      </Marker>
    </>
  );
};

export default CityMarker;
