import React from 'react';
import Title from '@src/components/UI/Title/Title';
import PublicationList from '@src/components/PublicationList/PublicationList';
import { useAppSelector } from '@src/hooks/hooks';
import { selectFavoritePublications } from '@src/store/publications/selectors';
import { useTranslation } from 'react-i18next';
import { IFavoritePublicationsProps } from '@src/pages/PublicationsPage/FavoritePublications/types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { PublicationType } from '@src/types/publication.types';
import * as S from '../style';

const FavoritePublications: React.FC<IFavoritePublicationsProps> = ({ type }) => {
  const favoritePublications = useAppSelector(selectFavoritePublications);
  const { t } = useTranslation();
  
  return (
    <>
      <Title
        fz={22}
        margin='0 0 30px'
      >
        {t(t(PUBLICATIONS_PAGE_CONFIG[type as PublicationType].favorite))}
      </Title>
      <S.PublicationsListWrapper>
        <PublicationList publications={favoritePublications}/>
      </S.PublicationsListWrapper>
    </>
  );
};

export default FavoritePublications;
