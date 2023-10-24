import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import { IMemorialMarkerContextMenuProps } from '@src/pages/AdminMemorialsPage/MemorialContextMenu/types';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@src/components/Loader/Loader';
import { useAppSelector } from '@src/hooks/hooks';
import { deleteMemorial } from '@src/store/memorials/thunks';
import * as S from './style';

const MemorialContextMenu: React.FC<IMemorialMarkerContextMenuProps> = ({ marker }) => {
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const isLoadingMemorials = useAppSelector((state) => state.memorials.loadingItems);
  const navigate = useNavigate();
  const { _id } = marker;
  const { t } = useTranslation();
  
  const toggleDeleteModalHandler = () => {
    setDeleteOpen(!isDeleteOpen);
  };
  
  const toggleEditHandler = () => {
    navigate(`/mapmem-admin/memorials/edit/${_id}`);
  };
  
  return (
    <>
      {isDeleteOpen && (
        <Modal outsideHandler={toggleDeleteModalHandler}>
          <DeleteModal
            itemId={_id as string}
            action={deleteMemorial}
            text={t('deleteMemorialMarkerText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      {isLoadingMemorials.includes(_id) && <S.MemorialLoaderWrapper><Loader size={15}/></S.MemorialLoaderWrapper>}
      <S.MemorialContextMenuWrapper>
        <S.MemorialContextItem onClick={toggleEditHandler}>{t('edit')}</S.MemorialContextItem>
        <S.MemorialContextItem onClick={toggleDeleteModalHandler}>{t('delete')}</S.MemorialContextItem>
      </S.MemorialContextMenuWrapper>
    </>
  );
};

export default MemorialContextMenu;
