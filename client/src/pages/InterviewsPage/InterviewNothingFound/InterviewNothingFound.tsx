import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Description from '@src/components/UI/Description/Description';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch } from '@src/hooks/hooks';
import { resetInterviews, resetInterviewsLimit, setInterviewsSearchValue } from '@src/store/interview/reducer';
import { getAllInterviewRequest } from '@src/store/interview/actions';
import * as S from './style';

const InterviewNothingFound: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const showAllInterviewHandler = useCallback(() => {
    dispatch(resetInterviewsLimit());
    dispatch(resetInterviews());
    dispatch(setInterviewsSearchValue(''));
    dispatch(getAllInterviewRequest());
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
          {t('interviewNothingFoundText')}
        </Description>
      </S.NothingFoundTextWrapper>
      <Button
        margin='20px 0 0'
        text={t('showAllInterviews')}
        clickHandler={showAllInterviewHandler}
        height='50px'
      />
    </S.NothingFoundWrapper>
  );
};

export default InterviewNothingFound;
