import React, { memo } from 'react';
import { ICityRowMarkerProps } from '@src/pages/AdminCityMarkerPage/СityMarkerRow/types';
import { Menu } from '@src/components/UI/Menu/Menu';
import CityMarkerContextMenu from '@src/pages/AdminCityMarkerPage/CityMarkerContextMenu/CityMarkerContextMenu';
import * as S from './style';

const CityMarkerRow: React.FC<ICityRowMarkerProps> = ({ marker }) => {
  const { lng, lat, count, index, name } = marker;
  
  return (
    <S.CityRowWrapper>
      <td>
        {index}
      </td>
      <td>
        <p>
          {name.uk}
        </p>
      </td>
      <td>
        {lat.toString().slice(0, 10)}
      </td>
      <td>
        {lng.toString().slice(0, 10)}
      </td>
      <td>
        {count}
      </td>
      <td>
        <Menu>
          <CityMarkerContextMenu marker={marker}/>
        </Menu>
      </td>
    </S.CityRowWrapper>
  );
};

export default memo(CityMarkerRow);
