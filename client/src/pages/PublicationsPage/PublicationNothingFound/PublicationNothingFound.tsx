import React from 'react';
import { useTranslation } from 'react-i18next';
import Description from '@src/components/UI/Description/Description';
import { IPublicationNothingFoundProps } from '@src/pages/PublicationsPage/PublicationNothingFound/types';
import * as S from './style';

const PublicationNothingFound: React.FC<IPublicationNothingFoundProps> = ({ text }) => {
  const { t } = useTranslation();
  
  return (
    <S.NothingFoundWrapper>
      
      <S.NothingFoundIcon>
        <span className='icon-nothing-found' />
      </S.NothingFoundIcon>
      
      <S.NothingFoundTextWrapper>
        <Description
          align='center'
          fz={16}
          margin='20px 0 0'
        >
          {t('publicationNothingFoundText', { value: text })}
        </Description>
      </S.NothingFoundTextWrapper>
      
    </S.NothingFoundWrapper>
  );
};

export default PublicationNothingFound;
