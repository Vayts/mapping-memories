import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { IPublicationContextMenuProps } from '@src/pages/AdminPublicationsPage/PublicationContextMenu/types';
import { useAppDispatch } from '@src/hooks/hooks';
import { deletePublication, removeFromFavorite, setFavorite } from '@src/store/publications/thunks';
import * as S from './style';

const PublicationContextMenu: React.FC<IPublicationContextMenuProps> = ({ publication }) => {
  const { _id, isFavorite } = publication;
  const [isDeleteOpen, setDeleteOpen] = useState(false);
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
      dispatch(setFavorite(_id));
      return false;
    }
    dispatch(removeFromFavorite(_id));
  };
  
  return (
    <>
      {/*{loadingPublications.includes(_id) && <S.PublicationLoaderWrapper><Loader size={15}/></S.PublicationLoaderWrapper>}*/}
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={_id}
            action={deletePublication}
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
