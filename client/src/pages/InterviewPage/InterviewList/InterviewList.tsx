import React, { memo } from 'react';
import { IInterviewList } from '@src/pages/InterviewPage/InterviewList/types';
import InterviewCard from '@src/pages/InterviewPage/InterviewCard/InterviewCard';
import * as S from './style';

const InterviewList: React.FC<IInterviewList> = ({ interviews }) => {
  return (
    <S.InterviewListWrapper>
      {interviews.map((item) => {
        return (
          <S.InterviewItem key={item._id}>
            <InterviewCard content={item}/>
          </S.InterviewItem>
        );
      })}
    </S.InterviewListWrapper>
  );
};

export default memo(InterviewList);
