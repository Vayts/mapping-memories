import React, { memo } from 'react';
import { IInterviewList } from '@src/pages/InterviewsPage/InterviewList/types';
import InterviewCard from '@src/pages/InterviewsPage/InterviewCard/InterviewCard';
import { IInterview } from '@src/types/interview.types';
import * as S from './style';

const InterviewList: React.FC<IInterviewList> = ({ interviews }) => {
  return (
    <S.InterviewListWrapper>
      {interviews.map((item: IInterview) => {
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
