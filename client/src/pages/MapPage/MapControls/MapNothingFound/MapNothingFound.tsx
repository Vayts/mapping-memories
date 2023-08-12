import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IMapNothingFoundProps } from '@src/pages/MapPage/MapControls/MapNothingFound/types';
import { MAP } from '@constants/map';
import * as S from './style';

const MapNothingFound: React.FC<IMapNothingFoundProps> = ({ setCoords }) => {
  const { t } = useTranslation();
  
  const zoomOut = useCallback(() => {
    setCoords(MAP.DEFAULT_LAT, MAP.DEFAULT_LNG, MAP.DEFAULT_ZOOM);
  }, []);
  
  return (
    <S.NothingFoundWrapper>
      <S.NothingIcon className='icon-nothing-found'/>
      <S.NothingText>{t('mapNothingFound')}</S.NothingText>
      <S.ZoomButton onClick={zoomOut}>{t('zoomOut')}</S.ZoomButton>
    </S.NothingFoundWrapper>
  );
};

export default MapNothingFound;
