import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { deletePublicationRequest } from '@src/store/adminPublications/action';
import { useNavigate } from 'react-router-dom';
import { IPublicationContextMenuProps } from '@src/pages/AdminPublicationsPage/PublicationContextMenu/types';
import * as S from './style';

const PublicationContextMenu: React.FC<IPublicationContextMenuProps> = ({ id }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const toggleDeleteModalHandler = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  
  const onEditClickHandler = () => {
    navigate(`/mapmem-admin/publications/edit/${id}`);
  };
  
  return (
    <>
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={id}
            action={deletePublicationRequest}
            text={t('deletePublicationText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      <S.PublicationContextMenuWrapper>
        <S.PublicationContextItem onClick={onEditClickHandler}>Редагувати</S.PublicationContextItem>
        <S.PublicationContextItem onClick={toggleDeleteModalHandler}>Видалити</S.PublicationContextItem>
      </S.PublicationContextMenuWrapper>
    </>
  );
};

export default PublicationContextMenu;
