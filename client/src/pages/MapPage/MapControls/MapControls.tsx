import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import {
  selectActiveTypes,
  selectCityMarkers,
  selectMemorialMarkers,
  selectTypeMarkers,
} from '@src/store/map/selectors';
import MarkerControlItem from '@src/pages/MapPage/MapControls/MarkerControlItem/MarkerControlItem';
import { IMapControlsProps } from '@src/pages/MapPage/MapControls/types';
import { MAP } from '@constants/map';
import CityControlItem from '@src/pages/MapPage/MapControls/СityControlItem/CityControlItem';
import { IMemorialMarker } from '@src/store/map/types';
import { getExtendBounds } from '@helpers/map.helper';
import TypeControlItem from '@src/pages/MapPage/MapControls/TypeControlItem/TypeControlItem';
import MapNothingFound from '@src/pages/MapPage/MapControls/MapNothingFound/MapNothingFound';
import { useTranslation } from 'react-i18next';
import { setActiveTypes } from '@src/store/map/reducer';
import Title from '@src/components/UI/Title/Title';
import * as S from './style';

const MapControls: React.FC<IMapControlsProps> = ({ setCoords, setActiveMarker, zoom, bounds }) => {
  const [sortedMarkers, setSortedMarkers] = useState<IMemorialMarker[]>([]);
  const [controlType, setControlType] = useState<string>(MAP.CITY);
  const [isMenuOpen, setMenuOpen] = useState<boolean>(true);
  const markers = useAppSelector(selectMemorialMarkers);
  const cities = useAppSelector(selectCityMarkers);
  const markerTypes = useAppSelector(selectTypeMarkers);
  const activeTypes = useAppSelector(selectActiveTypes);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (zoom <= MAP.CITY_ZOOM) {
      setControlType(MAP.CITY);
    }
    
    if (controlType !== MAP.MARKER && zoom > MAP.CITY_ZOOM) {
      setControlType(MAP.MARKER);
    }
  }, [zoom]);
  
  useEffect(() => {
    if (bounds) {
      const extendedBounds = getExtendBounds(bounds);
      const sorted = markers.filter((item) => {
        if (
          item.lat >= extendedBounds.south
          && item.lat <= extendedBounds.north
          && item.lng >= extendedBounds.west
          && item.lng <= extendedBounds.east
        ) {
          return item;
        }
        return null;
      });
      setSortedMarkers(sorted);
    }
  }, [markers, bounds]);
  
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setControlType(e.target.value);
  }, []);
  
  const resetFilters = useCallback(() => {
    dispatch(setActiveTypes([]));
  }, []);
  
  const generateContent = useCallback(() => {
    if (sortedMarkers.length === 0 && controlType === MAP.MARKER) {
      return (
        <MapNothingFound setCoords={setCoords}/>
      );
    }
    
    if (controlType === MAP.MARKER) {
      return (
        sortedMarkers.map((item) => (
          <MarkerControlItem
            key={item._id}
            marker={item}
            setCoords={setCoords}
            setActiveMarker={setActiveMarker}
          />
        )));
    }
    
    if (controlType === MAP.CITY) {
      return cities.map((item) => (
        <CityControlItem
          key={item._id}
          marker={item}
          setCoords={setCoords}
        />
      ));
    }
  }, [controlType, sortedMarkers]);
  
  const toggleMenu = useCallback(() => {
    setMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);
  
  return (
    <S.ControlsWrapper isOpen={isMenuOpen}>
      <S.ToggleButton onClick={toggleMenu}>
        <span className={isMenuOpen ? 'icon-cross' : 'icon-right'}/>
      </S.ToggleButton>
      <S.CategoriesBlock>
        <S.ControlTypeBlock>
          <Title
            margin='0'
            fw={400}
            fz={18}
            padding='3px 0'
          >
            {t('typeOfMemorials')}
          </Title>
          {activeTypes.length ? <S.ResetTypeButton onClick={resetFilters}>{t('resetFilters')}</S.ResetTypeButton> : null}
        </S.ControlTypeBlock>
        <S.MarkersList>
          {markerTypes.map((item) => {
            return (
              <TypeControlItem
                key={item._id}
                typeMarker={item}
              />
            );
          })}
        </S.MarkersList>
      </S.CategoriesBlock>
      <S.MarkersBlock>
        <S.MarkersTypes>
          <div>
            <S.MarkerTypeRadio
              name='markerType'
              id='memorialType'
              value={MAP.MARKER}
              checked={controlType === MAP.MARKER}
              onChange={changeHandler}
            />
            <S.MarkerTypeLabel htmlFor="memorialType">
              {t('memorials')}
            </S.MarkerTypeLabel>
          </div>
          <div>
            <S.MarkerTypeRadio
              name='markerType'
              id='cityType'
              value={MAP.CITY}
              checked={controlType === MAP.CITY}
              onChange={changeHandler}
            />
            <S.MarkerTypeLabel htmlFor="cityType">
              {t('cities')}
            </S.MarkerTypeLabel>
          </div>
        </S.MarkersTypes>
        <S.MarkersList>
          {generateContent()}
        </S.MarkersList>
      </S.MarkersBlock>
    </S.ControlsWrapper>
  );
};

export default memo(MapControls);
