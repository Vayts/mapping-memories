import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import CityMarkerTable from '@src/pages/AdminCityMarkerPage/CityMarkerTable/CityMarkerTable';
import Title from '@src/components/UI/Title/Title';
import { useTranslation } from 'react-i18next';
import Button from '@src/components/UI/Button/Button';
import AddCityMarkerModal from '@src/pages/AdminCityMarkerPage/AddCityMarkerModal/AddCityMarkerModal';
import Modal from '@src/components/Modal/Modal';
import { getAllCities } from '@src/store/cities/thunks';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AdminCityMarkerPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.cities.isLoading);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleRefresh = () => {
    dispatch(getAllCities());
  };
  
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
      <S.AdminHeader>
        <S.AdminTitleWrapper>
          <Title>{t('cityMarker')}</Title>
          <S.AdminRefreshButton className='icon-refresh' onClick={handleRefresh}/>
        </S.AdminTitleWrapper>
        
        <Button
          clickHandler={toggleAddModal}
          text={t('addCityMarker')}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </S.AdminHeader>
      {isLoading ? <Loader size={50}/> : <CityMarkerTable/>}
      
    </div>
  );
};

export default AdminCityMarkerPage;
