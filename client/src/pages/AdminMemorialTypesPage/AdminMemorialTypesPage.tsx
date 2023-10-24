import React, { useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useTranslation } from 'react-i18next';
import MemorialTypesTable from '@src/pages/AdminMemorialTypesPage/MemorialTypesTable/MemorialTypesTable';
import Modal from '@src/components/Modal/Modal';
import AddMemorialTypeModal from '@src/pages/AdminMemorialTypesPage/AddMemorialTypeModal/AddMemorialTypeModal';
import { getAllMemorialTypes } from '@src/store/memorialTypes/thunks';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AdminMemorialTypesPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.memorialTypes.isLoading);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const handleRefresh = () => {
    dispatch(getAllMemorialTypes());
  };
  
  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  
  return (
    <div>
      {isAddModalOpen && (
        <Modal outsideHandler={toggleAddModal}>
          <AddMemorialTypeModal onClose={toggleAddModal}/>
        </Modal>
      )}
      <S.AdminHeader>
        <S.AdminTitleWrapper>
          <Title>{t('memorialTypes')}</Title>
          <S.AdminRefreshButton className='icon-refresh' onClick={handleRefresh}/>
        </S.AdminTitleWrapper>
        <Button
          clickHandler={toggleAddModal}
          text={t('addMemorialType')}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </S.AdminHeader>
      {isLoading ? <Loader size={50}/> : <MemorialTypesTable/>}
    </div>
  );
};

export default AdminMemorialTypesPage;
