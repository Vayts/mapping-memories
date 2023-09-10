import React, { memo } from 'react';
import { Menu } from '@src/components/UI/Menu/Menu';
import { IMemorialRowProps } from '@src/pages/AdminMemorialTypesPage/MemorialTypeRow/types';
import MemorialTypeContextMenu from '@src/pages/AdminMemorialTypesPage/MemorialTypeContextMenu/MemorialTypeContextMenu';
import * as S from './style';

const MemorialTypeRow: React.FC<IMemorialRowProps> = ({ type }) => {
  const { name, index, count } = type;
  
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
        {count}
      </td>
      <td>
        <Menu>
          <MemorialTypeContextMenu type={type}/>
        </Menu>
      </td>
    </S.CityRowWrapper>
  );
};

export default memo(MemorialTypeRow);
