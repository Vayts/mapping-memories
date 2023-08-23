import React, { useEffect } from 'react';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import InterviewList from '@src/pages/InterviewPage/InterviewList/InterviewList';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectAllInterviews, selectFavoriteInterviews } from '@src/store/interview/selectors';
import { getAllInterviewRequest } from '@src/store/interview/actions';
import * as S from './style';
import FavoriteInterviewList from '@src/pages/InterviewPage/FavoriteInterviewList/FavoriteInterviewList';

const InterviewPage: React.FC = () => {
  const allInterviews = useAppSelector(selectAllInterviews);
  const favoriteInterviews = useAppSelector(selectFavoriteInterviews);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllInterviewRequest());
  }, []);
  
  return (
    <>
      <S.InterviewBanner>
        <img src='../assets/img/banner.svg' alt='mapping memories of Ukraine'/>
      </S.InterviewBanner>
      {
        favoriteInterviews.length ? (
          <>
            <Title
              fz={22}
              margin='0 0 30px'
            >
              {t('favoriteInterviews')}
            </Title>
            <FavoriteInterviewList interviews={favoriteInterviews}/>
          </>
        ) : null
      }
      <Title
        fz={22}
        margin='0 0 30px'
      >
        {t('allInterviews')}
      </Title>
      <InterviewList interviews={allInterviews}/>
    </>
  );
};

export default InterviewPage;
