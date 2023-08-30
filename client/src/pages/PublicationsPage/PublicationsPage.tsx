import React, { ChangeEvent, useCallback, useEffect } from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { Search } from '@src/components/UI/Search/Search';
import {
  selectPublications,
  selectPublicationsSearchValue,
  selectPublicationsLoading,
  selectPublicationsHasMoreContent, selectFavoritePublications, selectIsInSearch,
} from '@src/store/publications/selectors';
import { getPublicationsByTitle } from '@src/store/publications/actions';
import {
  addPublicationsLimit,
  resetPublicationsState, setCurrentPublicationType,
  setInSearch,
  setPublicationsSearchValue,
} from '@src/store/publications/reducer';
import Button from '@src/components/UI/Button/Button';
import PublicationList from '@src/components/PublicationList/PublicationList';
import PublicationNothingFound from '@src/components/PublicationNothingFound/PublicationNothingFound';
import { IPublicationsPageProps } from '@src/pages/PublicationsPage/types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { selectIsAppLoading } from '@src/store/app/selectors';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const PublicationsPage: React.FC<IPublicationsPageProps> = ({ type, withFavorite }) => {
  const isAppLoading = useAppSelector(selectIsAppLoading);
  const isInSearch = useAppSelector(selectIsInSearch);
  const isLoading = useAppSelector(selectPublicationsLoading);
  const hasMoreContent = useAppSelector(selectPublicationsHasMoreContent);
  const searchValue = useAppSelector(selectPublicationsSearchValue);
  const interviews = useAppSelector(selectPublications);
  const favoriteInterviews = useAppSelector(selectFavoritePublications);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(setCurrentPublicationType(type || ''));
    
    return () => {
      dispatch(resetPublicationsState());
    };
  }, [type]);
  
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      dispatch(setInSearch(false));
    }
    
    dispatch(setPublicationsSearchValue(e.target.value));
  }, []);
  
  const onSearchClickHandler = useCallback(() => {
    dispatch(getPublicationsByTitle());
  }, []);
  
  const addLimitHandler = useCallback(() => {
    dispatch(addPublicationsLimit());
  }, []);
  
  const generateFavoriteContent = () => {
    return withFavorite && favoriteInterviews.length ? (
      <>
        <Title
          fz={22}
          margin='0 0 30px'
        >
          {t('favoriteInterviews')}
        </Title>
        <S.PublicationsListWrapper>
          <PublicationList publications={favoriteInterviews}/>
        </S.PublicationsListWrapper>
      </>
    ) : null;
  };
  
  return (
    isAppLoading ? <Loader size={50}/> : (
      <S.PublicationsPageWrapper>
        <S.PublicationsBanner>
          <img src={`../assets/img/banner_${type || 'main'}.svg`} alt='interview banner'/>
        </S.PublicationsBanner>
        
        {generateFavoriteContent()}
        
        <S.PublicationsControls>
          <Title
            fz={22}
            margin='0'
          >
            {t(PUBLICATIONS_PAGE_CONFIG[type || 'default'].all)}
          </Title>
          <Search
            id='interviewSearch'
            name='biba'
            value={searchValue}
            onChange={onSearchChange}
            onSearch={onSearchClickHandler}
            isLoading={isLoading}
          />
        </S.PublicationsControls>
        
        <S.PublicationsListWrapper>
          
          {!interviews.length
            && (
              <PublicationNothingFound
                text={t(PUBLICATIONS_PAGE_CONFIG[type || 'default'].nothing)}
              />
            )}
          
          <PublicationList publications={interviews}/>
          
          {hasMoreContent && (
            <S.PublicationsMoreButton>
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                text={t('seeMore')}
                clickHandler={addLimitHandler}
                height='50px'
                width='250px'
              />
            </S.PublicationsMoreButton>
            
          )}
        </S.PublicationsListWrapper>
      </S.PublicationsPageWrapper>
    )
  );
};

export default PublicationsPage;
