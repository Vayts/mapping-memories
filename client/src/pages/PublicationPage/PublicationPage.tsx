import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { format } from 'date-fns';
import { LOCALE_MAP } from '@constants/locale';
import { selectLocale } from '@src/store/core/selectors';
import { IPublication } from '@src/types/publication.types';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import PublicationContent from '@src/pages/PublicationPage/PublicationContent/PublicationContent';
import { Loader } from '@src/components/Loader/Loader';
import PublicationCard from '@src/components/PublicationCard/PublicationCard';
import { getCurrentPublication } from '@src/store/currentPublication/thunks';
import * as S from './style';

const PublicationPage: React.FC = () => {
  const { id } = useParams();
  const isLoading = useAppSelector((state) => state.currentPublication.isLoading);
  const publication = useAppSelector((state) => state.currentPublication.currentPublication) as IPublication;
  const asideData = useAppSelector((state) => state.currentPublication.asideData);
  const locale = useAppSelector(selectLocale);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    if (id) {
      window.scroll(0, 0);
      dispatch(getCurrentPublication(id));
    }
  }, [id]);
  
  return (
    publication && (
      <S.PublicationPageWrapper>
        {isLoading ? <Loader size={50}/> : (
          <>
            <S.PublicationContentWrapper>
              <S.PublicationDate>{format(new Date(publication.createdAt), 'dd MMMM yyyy', { locale: LOCALE_MAP[locale] })}</S.PublicationDate>
              <Title margin='20px 0' fz={24} fw={600}>{publication.title[locale]}</Title>
              
              <PublicationContent contentBlocks={publication.contentBlocks}/>
            </S.PublicationContentWrapper>
            <S.PublicationAside>
              <Title margin='0 0 15px'>{t('additionalPublicationsTitle')}</Title>
              {
                asideData.map((item) => {
                  return (
                    <S.PublicationAsideArticle key={item._id}>
                      <PublicationCard publication={item}/>
                    </S.PublicationAsideArticle>
                  );
                })
              }
            </S.PublicationAside>
          </>
        )}
      </S.PublicationPageWrapper>
    )
  );
};

export default PublicationPage;
