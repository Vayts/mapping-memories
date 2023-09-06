import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectEditPublicationLoading, selectPublicationForEdit } from '@src/store/editPublication/selectors';
import { getPublicationForEditRequest } from '@src/store/editPublication/actions';
import EditPublicationMain from '@src/pages/EditPublicationPage/EditPublicationMain/EditPublicationMain';
import * as S from './style';

const EditPublicationPage: React.FC = () => {
  const publication = useAppSelector(selectPublicationForEdit);
  const isLoading = useAppSelector(selectEditPublicationLoading);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getPublicationForEditRequest(id as string));
  }, []);
  
  return (
    <S.EditPublicationWrapper>
      {publication && !isLoading && <EditPublicationMain publication={publication}/>}
    </S.EditPublicationWrapper>
  );
};

export default EditPublicationPage;
