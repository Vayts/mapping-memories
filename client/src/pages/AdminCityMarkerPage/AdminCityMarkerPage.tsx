import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { getCityMarkersRequest } from '@src/store/adminMarkers/action';
import CityMarkerTable from '@src/pages/AdminCityMarkerPage/CityMarkerTable/CityMarkerTable';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import Button from '@src/components/UI/Button/Button';
import AddCityMarkerModal from '@src/pages/AdminCityMarkerPage/AddCityMarkerModal/AddCityMarkerModal';
import Modal from '@src/components/Modal/Modal';
import { selectIsMarkersLoading } from '@src/store/adminMarkers/selectors';
import * as S from './style';

const AdminCityMarkerPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsMarkersLoading);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getCityMarkersRequest());
  }, []);
  
  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  
  return (
    <div>
      {isAddModalOpen && (
        <Modal outsideHandler={toggleAddModal}>
          <AddCityMarkerModal onClose={toggleAddModal}/>
        </Modal>
      )}
      <S.AdminCityMarkerHeader>
        <Title>{t('cityMarker')}</Title>
        <Button
          clickHandler={toggleAddModal}
          text={t('addCityMarker')}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </S.AdminCityMarkerHeader>
      <CityMarkerTable/>
    </div>
  );
};

export default AdminCityMarkerPage;
