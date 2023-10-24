import React from 'react';
import Title from '@src/components/UI/Title/Title';
import Button from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import AdminsMemorialsTable from '@src/pages/AdminMemorialsPage/AdminMemorialsTable/AdminMemorialsTable';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { getAllMemorials } from '@src/store/memorials/thunks';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AdminMemorialsPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.memorials.isLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const navigateToAddHandler = () => {
    navigate('/mapmem-admin/memorials/add');
  };
  
  const handleRefresh = () => {
    dispatch(getAllMemorials());
  };
  
  return (
    <div>
      <S.AdminHeader>
        <S.AdminTitleWrapper>
          <Title>{t('memorials')}</Title>
          <S.AdminRefreshButton className='icon-refresh' onClick={handleRefresh}/>
        </S.AdminTitleWrapper>
        
        <S.AdminHeaderControls>
          <Button
            clickHandler={navigateToAddHandler}
            text={t('addMemorial')}
          />
        </S.AdminHeaderControls>
      </S.AdminHeader>
      {isLoading ? <Loader size={50}/> : <AdminsMemorialsTable/>}
    </div>
  );
};

export default AdminMemorialsPage;
