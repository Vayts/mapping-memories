import React from 'react';
import Card from '@src/components/Card/Card';
import { IInterviewList } from '@src/pages/InterviewPage/InterviewList/types';
import * as S from './style';

const InterviewList: React.FC<IInterviewList> = ({ interviews }) => {
  return (
    <S.InterviewListWrapper>
      {interviews.map((item) => {
        return (
          <S.InterviewItem key={item._id}>
            <Card content={item}/>
          </S.InterviewItem>
        );
      })}
    </S.InterviewListWrapper>
  );
};

export default InterviewList;
