import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { deletePublicationRequest } from '@src/store/adminPublications/action';
import { useNavigate } from 'react-router-dom';
import { IPublicationContextMenuProps } from '@src/pages/AdminPublicationsPage/PublicationContextMenu/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { removeFavoritePublicationRequest, setFavoritePublicationRequest } from '@src/store/publications/actions';
import { selectLoadingPublication } from '@src/store/adminPublications/selectors';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const PublicationContextMenu: React.FC<IPublicationContextMenuProps> = ({ publication }) => {
  const { _id, isFavorite } = publication;
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const loadingPublications = useAppSelector(selectLoadingPublication);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const toggleDeleteModalHandler = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  
  const onEditClickHandler = () => {
    navigate(`/mapmem-admin/publications/edit/${_id}`);
  };
  
  const changeFavoriteStatusClickHandler = () => {
    if (!isFavorite) {
      dispatch(setFavoritePublicationRequest(_id));
      return false;
    }
    dispatch(removeFavoritePublicationRequest(_id));
  };
  
  return (
    <>
      {loadingPublications.includes(_id) && <S.PublicationLoaderWrapper><Loader size={15}/></S.PublicationLoaderWrapper>}
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={_id}
            action={deletePublicationRequest}
            text={t('deletePublicationText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      <S.PublicationContextMenuWrapper>
        <S.PublicationContextItem onClick={onEditClickHandler}>{t('edit')}</S.PublicationContextItem>
        {!isFavorite && <S.PublicationContextItem onClick={changeFavoriteStatusClickHandler}>{t('addToFavorite')}</S.PublicationContextItem>}
        {isFavorite && <S.PublicationContextItem onClick={changeFavoriteStatusClickHandler}>{t('removeFromFavorite')}</S.PublicationContextItem>}
        <S.PublicationContextItem onClick={toggleDeleteModalHandler}>{t('delete')}</S.PublicationContextItem>
      </S.PublicationContextMenuWrapper>
    </>
  );
};

export default PublicationContextMenu;
