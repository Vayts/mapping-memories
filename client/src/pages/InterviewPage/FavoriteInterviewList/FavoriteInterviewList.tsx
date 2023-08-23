import React from 'react';
import { IFavoriteInterviewList } from '@src/pages/InterviewPage/FavoriteInterviewList/types';
import Card from '@src/components/Card/Card';
import * as S from './style';

const FavoriteInterviewList: React.FC<IFavoriteInterviewList> = ({ interviews }) => {
  return (
    <S.FavoriteInterviewListWrapper>
      {interviews.map((item) => {
        return (
          <S.FavoriteInterviewItem key={item._id}>
            <Card content={item}/>
          </S.FavoriteInterviewItem>
        );
      })}
    </S.FavoriteInterviewListWrapper>
  );
};

export default FavoriteInterviewList;
