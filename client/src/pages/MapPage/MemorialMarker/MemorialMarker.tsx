import React, { memo, useCallback } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';
import { IMemorialMarkerProps } from '@src/pages/MapPage/MemorialMarker/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import { MAP } from '@constants/map';
import { useTranslation } from 'react-i18next';
import './InfoWindow.css';
import InfoWindowContent from '@src/pages/MapPage/MemorialMarker/InfoWindowContent/InfoWindowContent';

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
        icon={{ url: icon }}
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
