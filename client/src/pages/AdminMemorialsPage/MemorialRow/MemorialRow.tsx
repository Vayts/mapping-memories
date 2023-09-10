import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from '@src/components/UI/Menu/Menu';
import { IMemorialRowProps } from '@src/pages/AdminMemorialsPage/MemorialRow/types';
import { STATIC_HREF } from '@constants/app';
import MemorialContextMenu from '@src/pages/AdminMemorialsPage/MemorialContextMenu/MemorialContextMenu';
import * as S from './style';

const MemorialRow: React.FC<IMemorialRowProps> = ({ memorial }) => {
  const { index, title, description, icon, lat, lng, city } = memorial;
  
  return (
    <S.PublicationRowWrapper>
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
        {lat.toFixed(10)}
      </td>
      <td>
        {lng.toFixed(10)}
      </td>
      <td>
        {city}
      </td>
      <td>
        <Menu>
          <MemorialContextMenu marker={memorial}/>
        </Menu>
      </td>
    </S.PublicationRowWrapper>
  );
};

export default MemorialRow;
