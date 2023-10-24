import React from 'react';
import Title from '@src/components/UI/Title/Title';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import PublicationList from '@src/components/PublicationList/PublicationList';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/hooks/hooks';
import { IAllPublicationsProps } from '@src/pages/PublicationsPage/AllPublications/types';
import { Loader } from '@src/components/Loader/Loader';
import { selectAllPublications } from '@src/store/publications/selectors';
import * as S from './style';

const AllPublications: React.FC<IAllPublicationsProps> = ({ type }) => {
  const publications = useAppSelector((state) => selectAllPublications(state));
  const isLoading = useAppSelector((state) => state.publications.isLoading);
  const showNotExist = false;
  const { t } = useTranslation();
  
  return (
    <>
      <S.PublicationsControls>
        <Title
          fz={22}
          margin='0'
        >
          {t(PUBLICATIONS_PAGE_CONFIG[type || 'default'].all as string)}
        </Title>
      </S.PublicationsControls>
      {isLoading && !publications.length && <Loader size={50}/>}
      
      {!showNotExist && isLoading ? <Loader/> : <PublicationList publications={publications}/>}
    </>
  );
};

export default AllPublications;
