import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import EditPublicationMain from '@src/pages/EditPublicationPage/EditPublicationMain/EditPublicationMain';
import { getCurrentPublication } from '@src/store/currentPublication/thunks';
import * as S from './style';

const EditPublicationPage: React.FC = () => {
  const publication = useAppSelector((state) => state.currentPublication.currentPublication);
  const isLoading = useAppSelector((state) => state.currentPublication.isLoading);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getCurrentPublication(id as string));
  }, []);
  
  return (
    <S.EditPublicationWrapper>
      {publication && !isLoading && <EditPublicationMain publication={publication}/>}
    </S.EditPublicationWrapper>
  );
};

export default EditPublicationPage;
