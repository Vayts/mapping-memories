import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { getCurrentPublicationRequest } from '@src/store/publication/actions';
import { format } from 'date-fns';
import { LOCALE_MAP } from '@constants/locale';
import { selectCurrentPublication } from '@src/store/publication/selectors';
import { selectLocale } from '@src/store/app/selectors';
import { IPublication } from '@src/types/publication.types';
import Title from '@src/components/UI/Title/Title';
import * as S from './style';

const PublicationPage: React.FC = () => {
  const { id } = useParams();
  const publication = useAppSelector(selectCurrentPublication) as IPublication;
  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getCurrentPublicationRequest(id));
  }, []);
  
  return (
    publication && (
      <S.PublicationPageWrapper>
        <S.PublicationDate>{format(new Date(publication.createdAt), 'dd MMMM yyyy', { locale: LOCALE_MAP[locale] })}</S.PublicationDate>
        <Title margin='20px 0' fz={24} fw={600}>{publication.title[locale]}</Title>
      </S.PublicationPageWrapper>
    )
  );
};

export default PublicationPage;
