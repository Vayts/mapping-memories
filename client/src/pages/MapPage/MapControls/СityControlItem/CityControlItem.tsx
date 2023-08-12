import React, { memo, useCallback } from 'react';
import { ICityControlItemProps } from '@src/pages/MapPage/MapControls/СityControlItem/types';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import * as S from './style';

const CityControlItem: React.FC<ICityControlItemProps> = ({ marker, setCoords }) => {
  const { icon, lng, lat, name, count } = marker;
  const locale = useAppSelector(selectLocale);
  
  const clickHandler = useCallback(() => {
    setCoords(lat, lng, 10);
  }, []);
  
  return (
    <S.CityControlWrapper onClick={clickHandler}>
      <S.CityMarkerIcon src={icon} alt="marker icon"/>
      <S.MarkerInfo>
        <S.MarkerTitle>{name[locale]}</S.MarkerTitle>
        <S.MarkerCounter>{count}</S.MarkerCounter>
      </S.MarkerInfo>
    </S.CityControlWrapper>
  );
};

export default memo(CityControlItem);
