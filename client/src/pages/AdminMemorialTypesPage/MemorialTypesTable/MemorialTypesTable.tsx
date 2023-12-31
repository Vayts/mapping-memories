import React from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import MemorialTypeRow from '@src/pages/AdminMemorialTypesPage/MemorialTypeRow/MemorialTypeRow';
import { selectAllMemorialTypes } from '@src/store/memorialTypes/selectors';
import * as S from './style';

const MemorialTypesTable: React.FC = () => {
  const memorialTypes = useAppSelector(selectAllMemorialTypes);
  
  return (
    <S.MemorialTypesTableWrapper>
      <S.MemorialTypesTableHead>
        <tr>
          <th>
            №
          </th>
          <th>
            Назва
          </th>
          <th>
            Кількість
          </th>
          <th>
            #
          </th>
        </tr>
      </S.MemorialTypesTableHead>
      <tbody>
        {memorialTypes.map((item) => {
          return <MemorialTypeRow key={item._id} type={item}/>;
        })}
      </tbody>
    </S.MemorialTypesTableWrapper>
  );
};

export default MemorialTypesTable;
