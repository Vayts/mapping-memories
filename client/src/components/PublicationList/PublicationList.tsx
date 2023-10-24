import React, { memo } from 'react';
import PublicationCard from '@src/components/PublicationCard/PublicationCard';
import { IPublicationList } from '@src/components/PublicationList/types';
import { IPublication } from '@src/types/publication.types';
import * as S from './style';

const PublicationList: React.FC<IPublicationList> = ({ publications }) => {
  return (
    <S.PublicationListWrapper>
      {publications.map((item: IPublication) => {
        return (
          <S.PublicationItem key={item._id}>
            <PublicationCard publication={item}/>
          </S.PublicationItem>
        );
      })}
    </S.PublicationListWrapper>
  );
};

export default memo(PublicationList);
