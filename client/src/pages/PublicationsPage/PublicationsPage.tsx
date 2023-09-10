import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import {
  selectPublications,
  selectPublicationsLoading,
  selectPublicationsHasMoreContent, selectFavoritePublications, selectIsInSearch,
} from '@src/store/publications/selectors';
import {
  addPublicationsLimit, resetPublicationsLimit,
  resetPublicationsState, setCurrentPublicationType, setInSearch, setPublicationsSearchValue,
} from '@src/store/publications/reducer';
import Button from '@src/components/UI/Button/Button';
import { IPublicationsPageProps } from '@src/pages/PublicationsPage/types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { selectIsAppLoading } from '@src/store/app/selectors';
import { Loader } from '@src/components/Loader/Loader';
import PublicationNothingFound from '@src/pages/PublicationsPage/PublicationNothingFound/PublicationNothingFound';
import AllPublications from '@src/pages/PublicationsPage/AllPublications/AllPublications';
import FavoritePublications from '@src/pages/PublicationsPage/FavoritePublications/FavoritePublications';
import { getAllPublicationRequest } from '@src/store/publications/actions';
import { STATIC_HREF } from '@constants/app';
import * as S from './style';

const PublicationsPage: React.FC<IPublicationsPageProps> = ({
  type,
  withFavorite,
}) => {
  const isAppLoading = useAppSelector(selectIsAppLoading);
  const isInSearch = useAppSelector(selectIsInSearch);
  const isLoading = useAppSelector(selectPublicationsLoading);
  const hasMoreContent = useAppSelector(selectPublicationsHasMoreContent);
  const publications = useAppSelector(selectPublications);
  const favoriteInterviews = useAppSelector(selectFavoritePublications);
  const showNothingFound = !publications.length && isInSearch && !isLoading;
  const showMore = Boolean(publications.length) && isInSearch && !isLoading;
  const showFavorite = withFavorite && Boolean(favoriteInterviews.length);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(setCurrentPublicationType(type || ''));
    
    return () => {
      dispatch(resetPublicationsState());
    };
  }, [type]);
  
  const addLimitHandler = useCallback(() => {
    dispatch(addPublicationsLimit());
  }, []);
  
  const showAllPublicationHandler = useCallback(() => {
    dispatch(resetPublicationsLimit());
    dispatch(setPublicationsSearchValue(''));
    dispatch(setInSearch(false));
    dispatch(getAllPublicationRequest());
  }, []);
  
  return (
    <S.PublicationsPageWrapper>
      <S.PublicationsBanner>
        <img src={`${STATIC_HREF}/banner_${type || 'main'}.svg`} alt="interview banner" />
      </S.PublicationsBanner>
      {isAppLoading ? <Loader size={50} /> : (
        <>
          {showFavorite && <FavoritePublications type={type} />}
          
          <S.PublicationsListWrapper>
            <AllPublications type={type} />
            
            {showNothingFound && (
              <PublicationNothingFound
                text={t(PUBLICATIONS_PAGE_CONFIG[type || 'default'].nothing)}
              />
            )}
            
            <S.PublicationsMoreButton>
              {hasMoreContent && (
                <Button
                  disabled={isLoading}
                  isLoading={isLoading}
                  text={t('seeMore')}
                  clickHandler={addLimitHandler}
                  height="50px"
                  width="250px"
                />
              )}
              {showMore && (
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
