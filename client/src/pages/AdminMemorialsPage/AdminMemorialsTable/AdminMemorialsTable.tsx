import React from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import { selectAdminMemorialMarkers } from '@src/store/adminMarkers/selectors';
import MemorialRow from '@src/pages/AdminMemorialsPage/MemorialRow/MemorialRow';
import * as S from './style';

const AdminsMemorialsTable: React.FC = () => {
  const memorials = useAppSelector(selectAdminMemorialMarkers);
  
  return (
    <S.MemorialsTableWrapper>
      <S.MemorialsTableHead>
        <tr>
          <th>
            №
          </th>
          <th>
            Іконка
          </th>
          <th>
            Назва
          </th>
          <th>
            Опис
          </th>
          <th>
            Широта
          </th>
          <th>
            Довгота
          </th>
          <th>
            Місто
          </th>
          <th>
            #
          </th>
        </tr>
      </S.MemorialsTableHead>
      <tbody>
        {memorials.map((item) => {
          return (<MemorialRow key={item._id} memorial={item}/>);
        })}
      </tbody>
    </S.MemorialsTableWrapper>
  );
};

export default AdminsMemorialsTable;
