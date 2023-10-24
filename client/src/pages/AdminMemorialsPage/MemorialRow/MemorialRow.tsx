import React from 'react';
import { Menu } from '@src/components/UI/Menu/Menu';
import { IMemorialRowProps } from '@src/pages/AdminMemorialsPage/MemorialRow/types';
import { STATIC_HREF } from '@constants/app';
import MemorialContextMenu from '@src/pages/AdminMemorialsPage/MemorialContextMenu/MemorialContextMenu';
import * as S from './style';

const MemorialRow: React.FC<IMemorialRowProps> = ({ memorial }) => {
  const { index, title, description, icon, lat, lng, city } = memorial;
  
  return (
    <S.MemorialRowWrapper>
      <td>
        {index}
      </td>
      <td>
        <img src={`${STATIC_HREF}/${icon}`} alt='icon'/>
      </td>
      <td>
        <p>
          {title.uk}
        </p>
      </td>
      <td>
        <p>
          {description.uk}
        </p>
      </td>
      <td>
        {lat.toString().slice(0, 10)}
      </td>
      <td>
        {lng.toString().slice(0, 10)}
      </td>
      <td>
        {city}
      </td>
      <td>
        <Menu>
          <MemorialContextMenu marker={memorial}/>
        </Menu>
      </td>
    </S.MemorialRowWrapper>
  );
};

export default MemorialRow;
