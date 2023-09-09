import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { deleteMemorialMarkerRequest } from '@src/store/adminMarkers/action';
import { IMemorialMarkerContextMenuProps } from '@src/pages/AdminMemorialsPage/MemorialContextMenu/types';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const MemorialContextMenu: React.FC<IMemorialMarkerContextMenuProps> = ({ marker }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const toggleDeleteModalHandler = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  
  const toggleEditHandler = () => {
    navigate(`/mapmem-admin/memorials/edit/${marker._id}`);
  };
  
  return (
    <>
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={marker._id as string}
            action={deleteMemorialMarkerRequest}
            text={t('deleteMemorialMarkerText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      <S.MemorialContextMenuWrapper>
        <S.MemorialContextItem onClick={toggleEditHandler}>Редагувати</S.MemorialContextItem>
        <S.MemorialContextItem onClick={toggleDeleteModalHandler}>Видалити</S.MemorialContextItem>
      </S.MemorialContextMenuWrapper>
    </>
  );
};

export default MemorialContextMenu;
