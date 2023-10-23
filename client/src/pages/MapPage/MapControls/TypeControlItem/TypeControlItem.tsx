import React, { memo, useCallback } from 'react';
import Checkbox from '@src/components/UI/Checkbox/Checkbox';
import { ITypeControlItem } from '@src/pages/MapPage/MapControls/TypeControlItem/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/core/selectors';
import { setActiveTypes } from '@src/store/map/slice';
import * as S from './style';

const TypeControlItem: React.FC<ITypeControlItem> = ({ typeMarker }) => {
  const locale = useAppSelector(selectLocale);
  const types = useAppSelector((state) => state.map.activeTypes);
  const dispatch = useAppDispatch();
  
  const clickHandler = useCallback(() => {
    dispatch(setActiveTypes(typeMarker._id));
  }, [types]);
  
  return (
    <S.MarkerTypeItem>
      <Checkbox
        onChange={clickHandler}
        checked={types.includes(typeMarker._id)}
        value={typeMarker._id}
        label={`${typeMarker.name[locale]} (${typeMarker.count})`}
        id={`typeMarker${typeMarker._id}`}
      />
    </S.MarkerTypeItem>
  );
};

export default memo(TypeControlItem);
