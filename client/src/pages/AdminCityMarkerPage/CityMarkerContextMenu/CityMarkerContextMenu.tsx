import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import EditCityMarkerModal from '@src/pages/AdminCityMarkerPage/EditCityMarkerModal/EditCityMarkerModal';
import { deleteCityMarkerRequest } from '@src/store/adminMarkers/action';
import { ICityMarkerContextMenuProps } from '@src/pages/AdminCityMarkerPage/CityMarkerContextMenu/types';
import * as S from './style';

const CityMarkerContextMenu: React.FC<ICityMarkerContextMenuProps> = ({ marker }) => {
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
            itemId={marker._id as string}
            action={deleteCityMarkerRequest}
            text={t('deleteCityMarkerText')}
            onClose={toggleDeleteModalHandler}
          />
        </Modal>
      )}
      {isEditOpen && (
        <Modal outsideHandler={toggleEditHandler}>
          <EditCityMarkerModal
            marker={marker}
            onClose={toggleEditHandler}
          />
        </Modal>
      )}
      <S.CityMarkerContextMenuWrapper>
        <S.CityMarkerContextItem onClick={toggleEditHandler}>Редагувати</S.CityMarkerContextItem>
        <S.CityMarkerContextItem onClick={toggleDeleteModalHandler}>Видалити</S.CityMarkerContextItem>
      </S.CityMarkerContextMenuWrapper>
    </>
  );
};

export default CityMarkerContextMenu;
