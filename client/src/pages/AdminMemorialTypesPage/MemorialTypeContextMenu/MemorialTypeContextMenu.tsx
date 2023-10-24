import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import EditMemorialTypeModal from '@src/pages/AdminMemorialTypesPage/EditMemorialTypeModal/EditMemorialTypeModal';
import { IMemorialTypeContextMenuProps } from '@src/pages/AdminMemorialTypesPage/MemorialTypeContextMenu/types';
import { deleteMemorialType } from '@src/store/memorialTypes/thunks';
import * as S from './style';

const MemorialTypeContextMenu: React.FC<IMemorialTypeContextMenuProps> = ({ type }) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const { t } = useTranslation();
  
  const toggleDeleteModalHandler = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  
  const toggleEditHandler = () => {
    setEditOpen(!isEditOpen);
  };
  
  return (
    <>
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={type._id as string}
            action={deleteMemorialType}
            text={t('deleteMemorialTypeText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      {isEditOpen && (
        <Modal outsideHandler={toggleEditHandler}>
          <EditMemorialTypeModal
            type={type}
            onClose={toggleEditHandler}
          />
        </Modal>
      )}
      <S.MemorialTypeContextMenuWrapper>
        <S.MemorialTypeContextItem onClick={toggleEditHandler}>{t('edit')}</S.MemorialTypeContextItem>
        <S.MemorialTypeContextItem onClick={toggleDeleteModalHandler}>{t('delete')}</S.MemorialTypeContextItem>
      </S.MemorialTypeContextMenuWrapper>
    </>
  );
};

export default MemorialTypeContextMenu;
