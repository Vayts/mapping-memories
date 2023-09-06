import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectIsAppLoading } from '@src/store/app/selectors';
import { appFirstLoadAction } from '@src/store/app/action';
import { Loader } from '@src/components/Loader/Loader';
import * as S from './style';

const AdminLayout: React.FC = () => {
  const isLoading = useAppSelector(selectIsAppLoading);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appFirstLoadAction());
  }, []);
  
  return (
    <S.AdminLayoutWrapper>
      {isLoading ? <Loader size={50}/> : (
        <Outlet/>
      )}
    </S.AdminLayoutWrapper>
  );
};

export default AdminLayout;
