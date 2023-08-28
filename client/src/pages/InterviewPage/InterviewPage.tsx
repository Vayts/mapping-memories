import React, { ChangeEvent, useCallback, useEffect } from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import InterviewList from '@src/pages/InterviewPage/InterviewList/InterviewList';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { Search } from '@src/components/UI/Search/Search';
import {
  selectInterviews,
  selectInterviewsSearchValue,
  selectInterviewsLoading,
  selectInterviewsHasMoreContent, selectFavoriteInterviews,
} from '@src/store/interview/selectors';
import { getAllInterviewRequest, getFavoriteInterviewsRequest, getInterviewsByTitle } from '@src/store/interview/actions';
import { addInterviewsLimit, resetLimitAndData, setInSearch, setInterviewsSearchValue } from '@src/store/interview/reducer';
import Button from '@src/components/UI/Button/Button';
import InterviewNothingFound from '@src/pages/InterviewPage/InterviewNothingFound/InterviewNothingFound';
import * as S from './style';

const InterviewPage: React.FC = () => {
  const isLoading = useAppSelector(selectInterviewsLoading);
  const hasMoreContent = useAppSelector(selectInterviewsHasMoreContent);
  const searchValue = useAppSelector(selectInterviewsSearchValue);
  const interviews = useAppSelector(selectInterviews);
  const favoriteInterviews = useAppSelector(selectFavoriteInterviews);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllInterviewRequest());
    dispatch(getFavoriteInterviewsRequest());
    
    return () => {
      dispatch(resetLimitAndData());
    };
  }, []);
  
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      dispatch(setInSearch(false));
    }
    
    dispatch(setInterviewsSearchValue(e.target.value));
  }, []);

  const onSearchClickHandler = useCallback(() => {
    dispatch(getInterviewsByTitle());
  }, []);
  
  const addLimitHandler = useCallback(() => {
    dispatch(addInterviewsLimit());
  }, []);
  
  return (
    <S.InterviewsPageWrapper>
      <S.InterviewsBanner>
        <img src='../assets/img/banner2.svg' alt='mapping memories of Ukraine'/>
      </S.InterviewsBanner>
      {
        favoriteInterviews.length ? (
          <>
            <Title
              fz={22}
              margin='0 0 30px'
            >
              {t('favoriteInterviews')}
            </Title>
            <S.InterviewsListWrapper>
              <InterviewList interviews={favoriteInterviews}/>
            </S.InterviewsListWrapper>
          </>
        ) : null
      }
      <S.InterviewsControls>
        <Title
          fz={22}
          margin='0'
        >
          {t('allInterviews')}
        </Title>
        <Search
          id='interviewSearch'
          name='biba'
          value={searchValue}
          onChange={onSearchChange}
          onSearch={onSearchClickHandler}
          isLoading={isLoading}
        />
      </S.InterviewsControls>
      <S.InterviewsListWrapper>
        {!interviews.length && <InterviewNothingFound/>}
        <InterviewList interviews={interviews}/>
        {hasMoreContent && (
          <S.InterviewsMoreButton>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              text={t('seeMore')}
              clickHandler={addLimitHandler}
              height='50px'
              width='250px'
            />
          </S.InterviewsMoreButton>
        )}
      </S.InterviewsListWrapper>
    </S.InterviewsPageWrapper>
  );
};

export default InterviewPage;
