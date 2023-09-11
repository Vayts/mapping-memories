import React from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import { selectAdminCityMarkers } from '@src/store/cityMarkers/selectors';
import CityMarkerRow from '@src/pages/AdminCityMarkerPage/СityMarkerRow/CityMarkerRow';
import * as S from './style';

const CityMarkerTable: React.FC = () => {
  const cityMarkers = useAppSelector(selectAdminCityMarkers);

  return (
    <S.CityMarkerTableWrapper>
      <S.CityMarkerTableHead>
        <tr>
          <th>
            №
          </th>
          <th>
            Назва
          </th>
          <th>
            Широта
          </th>
          <th>
            Довгота
          </th>
          <th>
            Кількість
          </th>
          <th>
            #
          </th>
        </tr>
      </S.CityMarkerTableHead>
      <tbody>
        {cityMarkers.map((item) => {
          return <CityMarkerRow key={item._id} marker={item}/>;
        })}
      </tbody>
    </S.CityMarkerTableWrapper>
  );
};

export default CityMarkerTable;
