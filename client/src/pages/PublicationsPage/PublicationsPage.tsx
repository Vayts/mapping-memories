import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import Button from '@src/components/UI/Button/Button';
import { IPublicationsPageProps } from '@src/pages/PublicationsPage/types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { selectIsAppLoading } from '@src/store/core/selectors';
import { Loader } from '@src/components/Loader/Loader';
import PublicationNothingFound from '@src/pages/PublicationsPage/PublicationNothingFound/PublicationNothingFound';
import AllPublications from '@src/pages/PublicationsPage/AllPublications/AllPublications';
import FavoritePublications from '@src/pages/PublicationsPage/FavoritePublications/FavoritePublications';
import { STATIC_HREF } from '@constants/app';
import { resetPublications, resetPublicationsLimit } from '@src/store/publications/slice';
import { selectAllPublications } from '@src/store/publications/selectors';
import { getPublications, getPublicationsByTitle, loadMorePublications } from '@src/store/publications/thunks';
import { Search } from '@src/components/UI/Search/Search';
import PublicationsNotExist from '@src/pages/PublicationsPage/PublicationsNotExist/PublicationsNotExist';
import { PublicationEnum } from '@src/types/publication.types';
import * as S from './style';

const PublicationsPage: React.FC<IPublicationsPageProps> = ({
  type,
  withFavorite,
}) => {
  const isAppLoading = useAppSelector(selectIsAppLoading);
  const isLoading = useAppSelector((state) => state.publications.isLoading);
  const publications = useAppSelector(selectAllPublications);
  const favoritePublications = useAppSelector((state) => state.publications.favoritePublications);
  const [search, setSearch] = useState('');
  const [isInSearch, setIsInSearch] = useState(false);
  const showNothingFound = !publications.length && isInSearch && !isLoading;
  const showNotExist = !publications.length && !isInSearch && !isLoading;
  const hasMoreContent = useAppSelector((state) => state.publications.hasMoreContent);
  const loadMoreLoading = useAppSelector((state) => state.publications.loadMoreLoading);
  const showAll = Boolean(!publications.length) && isInSearch && !isLoading;
  const showFavorite = withFavorite && Boolean(favoritePublications.length) && !isInSearch;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getPublications({ type: type || '', search: '' }));
    
    return () => {
      dispatch(resetPublications());
    };
  }, [type]);
  
  const showAllPublicationHandler = useCallback(() => {
    dispatch(resetPublicationsLimit());
    dispatch(getPublications({ type: type || '', search: '' }));
    setSearch('');
    setIsInSearch(false);
  }, []);
  
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
  
  const addLimitHandler = () => {
    dispatch(loadMorePublications({ type: type || '', search }));
  };
  
  const onSearchClickHandler = useCallback(() => {
    if (!search && !publications.length) {
      setIsInSearch(false);
      dispatch(getPublicationsByTitle({ type: type || '', search }));
    } else if (!search && isInSearch) {
      setIsInSearch(false);
      dispatch(getPublicationsByTitle({ type: type || '', search }));
    } else if (search) {
      setIsInSearch(true);
      dispatch(getPublicationsByTitle({ type: type || '', search }));
    }
  }, [search]);
  
  return (
    <S.PublicationsPageWrapper>
      <S.PublicationsBanner>
        <img src={`${STATIC_HREF}/banner_${type || 'main'}.svg`} alt={`${type} banner`} />
      </S.PublicationsBanner>
      <Search
        height='40px'
        id='interviewSearch'
        name='searchAll'
        value={search}
        margin='0 0 20px'
        onChange={onSearchChange}
        onSearch={onSearchClickHandler}
        isLoading={isLoading}
        disabled={showNotExist}
      />
      
      {isAppLoading || isLoading ? (
        <S.PublicationsLoaderWrapper>
          <Loader size={50}/>
        </S.PublicationsLoaderWrapper>
      ) : (
        <>
          {showFavorite && <FavoritePublications type={type} />}
          
          <S.PublicationsListWrapper>
            
            {Boolean(publications.length) && !isLoading && <AllPublications type={type || ''}/>}
            
            {showNothingFound && (
              <PublicationNothingFound
                text={t(PUBLICATIONS_PAGE_CONFIG[(type as PublicationEnum) || 'default'].nothing)}
              />
            )}
            
            {showNotExist && !isLoading && <PublicationsNotExist />}
            
            <S.PublicationsMoreButton>
              {hasMoreContent && (
                <Button
                  disabled={loadMoreLoading}
                  isLoading={loadMoreLoading}
                  text={t('seeMore')}
                  clickHandler={addLimitHandler}
                  height="50px"
                  width="250px"
                />
              )}
              {showAll && (
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  text={t('showAllPublication')}
                  clickHandler={showAllPublicationHandler}
                  height="50px"
                  width="250px"
                />
              )}
            </S.PublicationsMoreButton>
            
          </S.PublicationsListWrapper>
        </>
      )}
    </S.PublicationsPageWrapper>
  );
};

export default PublicationsPage;
