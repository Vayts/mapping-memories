import React, { ChangeEvent, useCallback } from 'react';
import Title from '@src/components/UI/Title/Title';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { Search } from '@src/components/UI/Search/Search';
import PublicationList from '@src/components/PublicationList/PublicationList';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import {
  selectIsInSearch,
  selectPublications,
  selectPublicationsLoading,
  selectPublicationsSearchValue,
} from '@src/store/publications/selectors';
import { IAllPublicationsProps } from '@src/pages/PublicationsPage/AllPublications/types';
import {
  setPublicationsSearchValue,
} from '@src/store/publications/reducer';
import { getPublicationsByTitle } from '@src/store/publications/actions';
import PublicationsNotExist from '@src/pages/PublicationsPage/PublicationsNotExist/PublicationsNotExist';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AllPublications: React.FC<IAllPublicationsProps> = ({ type }) => {
  const publications = useAppSelector(selectPublications);
  const searchValue = useAppSelector(selectPublicationsSearchValue);
  const isLoading = useAppSelector(selectPublicationsLoading);
  const isInSearch = useAppSelector(selectIsInSearch);
  const dispatch = useAppDispatch();
  const showNotExist = !publications.length && !isInSearch;
  const { t } = useTranslation();
  
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setPublicationsSearchValue(e.target.value));
  }, []);
  
  const onSearchClickHandler = useCallback(() => {
    dispatch(getPublicationsByTitle());
  }, []);
  
  return (
    <>
      <S.PublicationsControls>
        <Title
          fz={22}
          margin='0'
        >
          {t(PUBLICATIONS_PAGE_CONFIG[type || 'default'].all)}
        </Title>
        <Search
          id='interviewSearch'
          name='searchAll'
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearchClickHandler}
          isLoading={isLoading}
          disabled={showNotExist}
        />
      </S.PublicationsControls>
      {isLoading && <Loader size={50}/>}
      {showNotExist && !isLoading ? <PublicationsNotExist /> : <PublicationList publications={publications}/>}
    </>
  );
};

export default AllPublications;
