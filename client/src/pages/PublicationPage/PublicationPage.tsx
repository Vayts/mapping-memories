import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { getCurrentPublicationRequest } from '@src/store/publication/actions';
import { format } from 'date-fns';
import { LOCALE_MAP } from '@constants/locale';
import {
  selectAsideData,
  selectAsideDataIsLoading,
  selectCurrentPublication,
  selectCurrentPublicationIsLoading,
} from '@src/store/publication/selectors';
import { selectLocale } from '@src/store/app/selectors';
import { IPublication } from '@src/types/publication.types';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import PublicationContent from '@src/pages/PublicationPage/PublicationContent/PublicationContent';
import { Loader } from '@src/components/Loader/Loader';
import { resetCurrentPublication } from '@src/store/publication/reducer';
import PublicationCard from '@src/components/PublicationCard/PublicationCard';
import * as S from './style';

const PublicationPage: React.FC = () => {
  const { id } = useParams();
  const isLoading = useAppSelector(selectCurrentPublicationIsLoading);
  const publication = useAppSelector(selectCurrentPublication) as IPublication;
  const asideData = useAppSelector(selectAsideData);
  const isAsideLoading = useAppSelector(selectAsideDataIsLoading);
  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getCurrentPublicationRequest(id));
    
    return () => {
      dispatch(resetCurrentPublication());
    };
  }, [id]);
  
  return (
    publication && (
      <S.PublicationPageWrapper>
        <S.PublicationContentWrapper>
          {isLoading && <Loader size={50}/>}
          {!isLoading && (
            <>
              <S.PublicationDate>{format(new Date(publication.createdAt), 'dd MMMM yyyy', { locale: LOCALE_MAP[locale] })}</S.PublicationDate>
              <Title margin='20px 0' fz={24} fw={600}>{publication.title[locale]}</Title>
              
              <PublicationContent contentBlocks={publication.contentBlocks}/>
            </>
          )}
        </S.PublicationContentWrapper>
        <S.PublicationAside>
          <Title margin='0 0 15px'>{t('recentPublications')}</Title>
          {isAsideLoading && <Loader size={50}/>}
          {!isAsideLoading && (
            asideData.map((item) => {
              return (
                <S.PublicationAsideArticle key={item._id}>
                  <PublicationCard publication={item}/>
                </S.PublicationAsideArticle>
              );
            })
          )}
        </S.PublicationAside>
      </S.PublicationPageWrapper>
    )
  );
};

export default PublicationPage;
