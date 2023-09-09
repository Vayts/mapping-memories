import React, { useEffect } from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import AdminsMemorialsTable from '@src/pages/AdminMemorialsPage/AdminMemorialsTable/AdminMemorialsTable';
import { useAppDispatch } from '@src/hooks/hooks';
import { getAllMemorialMarkersRequest } from '@src/store/adminMarkers/action';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const AdminMemorialsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  useEffect(() => {
    dispatch(getAllMemorialMarkersRequest());
  }, []);
  
  const navigateToAddHandler = () => {
    navigate('/mapmem-admin/memorials/add');
  };
  
  return (
    <div>
      <S.AdminHeader>
        <Title>{t('memorials')}</Title>
        <S.AdminHeaderControls>
          <Button
            clickHandler={navigateToAddHandler}
            text={t('addMemorial')}
          />
        </S.AdminHeaderControls>
      </S.AdminHeader>
      <AdminsMemorialsTable/>
    </div>
  );
};

export default AdminMemorialsPage;
