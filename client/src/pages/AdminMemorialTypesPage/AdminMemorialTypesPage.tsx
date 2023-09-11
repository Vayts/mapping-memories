import React, { useEffect, useState } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useTranslation } from 'react-i18next';
import MemorialTypesTable from '@src/pages/AdminMemorialTypesPage/MemorialTypesTable/MemorialTypesTable';
import Modal from '@src/components/Modal/Modal';
import AddMemorialTypeModal from '@src/pages/AdminMemorialTypesPage/AddMemorialTypeModal/AddMemorialTypeModal';
import { selectIsMemorialTypesLoading } from '@src/store/memorialTypes/selectors';
import { getAllMemorialTypesRequest } from '@src/store/memorialTypes/action';
import * as S from './style';

const AdminMemorialTypesPage: React.FC = () => {
  const isLoading = useAppSelector(selectIsMemorialTypesLoading);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllMemorialTypesRequest());
  }, []);
  
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
      <S.AdminMemorialTypeHeader>
        <Title>{t('memorialTypes')}</Title>
        <Button
          clickHandler={toggleAddModal}
          text={t('addMemorialType')}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </S.AdminMemorialTypeHeader>
      <MemorialTypesTable/>
    </div>
  );
};

export default AdminMemorialTypesPage;
