import React, { memo } from 'react';
import { BASE_URL } from '@src/api/axios';
import { format } from 'date-fns';
import Title from '@src/components/UI/Title/Title';
import Description from '@src/components/UI/Description/Description';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLocale } from '@src/store/app/selectors';
import ukLocale from 'date-fns/locale/uk';
import enLocale from 'date-fns/locale/en-US';
import { IInterviewCard } from './types';
import * as S from './style';

const localeMap = {
  en: enLocale,
  uk: ukLocale,
};

const InterviewCard: React.FC<IInterviewCard> = ({ content }) => {
  const locale = useAppSelector(selectLocale);
  
  return (
    <S.CardWrapper to='/interviews'>
      <S.CardImg src={`${BASE_URL}/photo/download?id=${content.photo}`}/>
      <S.CardInfo>
        <S.CardDate>{format(new Date(content.createdAt), 'dd MMM yyyy', { locale: localeMap[locale] })}</S.CardDate>
        <S.CardTitleWrapper>
          <Title
            fz={18}
            fw={600}
            margin='0'
          >
            {content.title[locale]}
          </Title>
          <span className='icon-link'/>
        </S.CardTitleWrapper>
        <Description
          fz={14}
          margin='10px 0'
        >
          {content.description[locale]}
        </Description>
      </S.CardInfo>
    </S.CardWrapper>
  );
};

export default memo(InterviewCard);
