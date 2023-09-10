import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Description from '@src/components/UI/Description/Description';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch } from '@src/hooks/hooks';
import { resetPublications, resetPublicationsLimit, setInSearch, setPublicationsSearchValue } from '@src/store/publications/reducer';
import { getAllPublicationRequest } from '@src/store/publications/actions';
import { IPublicationNothingFoundProps } from '@src/pages/PublicationsPage/PublicationNothingFound/types';
import * as S from './style';

const PublicationNothingFound: React.FC<IPublicationNothingFoundProps> = ({ text }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const showAllPublicationHandler = useCallback(() => {
    dispatch(resetPublicationsLimit());
    dispatch(resetPublications());
    dispatch(setPublicationsSearchValue(''));
    dispatch(setInSearch(false));
    dispatch(getAllPublicationRequest());
  }, []);
  
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
      
      <Button
        margin='20px 0 0'
        text={t('showAllPublication')}
        clickHandler={showAllPublicationHandler}
        height='50px'
      />
      
    </S.NothingFoundWrapper>
  );
};

export default PublicationNothingFound;
