import React, { memo, useCallback } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { IMemorialMarkerProps } from '@src/pages/MapPage/MemorialMarker/types';
import { MAP } from '@constants/map';
import './InfoWindow.css';
import InfoWindowContent from '@src/pages/MapPage/MemorialMarker/InfoWindowContent/InfoWindowContent';
import { STATIC_HREF } from '@constants/app';

const MemorialMarker: React.FC<IMemorialMarkerProps> = (
  {
    marker,
    activeMarker,
    setActiveMarker,
    setCoords,
  },
) => {
  const {
    _id,
    lat,
    lng,
    icon,
  } = marker;
  
  const setMarker = useCallback(() => {
    setActiveMarker(marker);
    setCoords(lat + MAP.MARKER_OFFSET, lng, 12);
  }, []);
  
  const closeMarker = useCallback(() => {
    setActiveMarker(null);
  }, []);
  
  return (
    <>
      <Marker
        position={{ lat, lng }}
        icon={{ url: `${STATIC_HREF}/${icon}` }}
        onClick={setMarker}
      />
      {activeMarker?._id === _id ? (
        <InfoWindow
          position={marker}
          onCloseClick={closeMarker}
          options={
            {
              pixelOffset: new google.maps.Size(0, -40),
              disableAutoPan: true,
            }
          }
        >
          <InfoWindowContent marker={marker}/>
        </InfoWindow>
      ) : null}
    </>
  );
};

export default memo(MemorialMarker);
