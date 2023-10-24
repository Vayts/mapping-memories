import React, { useState } from 'react';
import Modal from '@src/components/Modal/Modal';
import DeleteModal from '@src/components/DeleteModal/DeleteModal';
import { useTranslation } from 'react-i18next';
import EditCityMarkerModal from '@src/pages/AdminCityMarkerPage/EditCityMarkerModal/EditCityMarkerModal';
import { ICityMarkerContextMenuProps } from '@src/pages/AdminCityMarkerPage/CityMarkerContextMenu/types';
import { deleteCity } from '@src/store/cities/thunks';
import { useAppSelector } from '@src/hooks/hooks';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const CityMarkerContextMenu: React.FC<ICityMarkerContextMenuProps> = ({ marker }) => {
  const { _id } = marker;
  const loadingCities = useAppSelector((state) => state.cities.loadingItems);
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
            itemId={_id}
            action={deleteCity}
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
      {loadingCities.includes(_id) && <S.CitiLoaderWrapper><Loader size={15}/></S.CitiLoaderWrapper>}
      <S.CityMarkerContextMenuWrapper>
        <S.CityMarkerContextItem onClick={toggleEditHandler}>Редагувати</S.CityMarkerContextItem>
        <S.CityMarkerContextItem onClick={toggleDeleteModalHandler}>Видалити</S.CityMarkerContextItem>
      </S.CityMarkerContextMenuWrapper>
    </>
  );
};

export default CityMarkerContextMenu;
