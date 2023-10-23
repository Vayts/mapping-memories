import React from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import PublicationRow from '@src/pages/AdminPublicationsPage/PublicationRow/PublicationRow';
import { selectAllPublications } from '@src/store/publications/selectors';
import * as S from './style';

const PublicationsTable: React.FC = () => {
  const publications = useAppSelector(selectAllPublications);
  
  return (
    <S.PublicationsTableWrapper>
      <S.PublicationsTableHead>
        <tr>
          <th>
            №
          </th>
          <th>
            Назва
          </th>
          <th>
            Опис
          </th>
          <th>
            Тип
          </th>
          <th>
            Дата
          </th>
          <th>
            #
          </th>
        </tr>
      </S.PublicationsTableHead>
      <tbody>
        {publications.map((item) => {
          return (<PublicationRow key={item._id} publication={item}/>);
        })}
      </tbody>
    </S.PublicationsTableWrapper>
  );
};

export default PublicationsTable;
