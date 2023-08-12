import React, { memo, useCallback } from 'react';
import { IMarkerControllerItemProps } from '@src/pages/MapPage/MapControls/MarkerControlItem/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import { MAP } from '@constants/map';
import * as S from './style';

const MarkerControlItem: React.FC<IMarkerControllerItemProps> = ({ marker, setCoords, setActiveMarker }) => {
  const { lng, lat, icon, title, address } = marker;
  const locale = useAppSelector(selectLocale);
  const clickHandler = useCallback(() => {
    setCoords(lat + MAP.MARKER_OFFSET, lng, 12);
    setActiveMarker(marker);
  }, []);
  
  return (
    <S.MemorialControlWrapper onClick={clickHandler}>
      <S.MemorialIcon src={icon} alt="marker icon"/>
      <S.MemorialInfo>
        <S.MemorialTitle>{title[locale]}</S.MemorialTitle>
        <S.MemorialAddress>{address[locale]}</S.MemorialAddress>
      </S.MemorialInfo>
    </S.MemorialControlWrapper>
  );
};

export default memo(MarkerControlItem);
