import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '@src/hooks/hooks';
import { Loader } from '@src/components/Loader/Loader';
import { adminFirstLoad } from '@src/store/core/thunks';
import { errorManager } from '@helpers/error.helper';
import * as S from './style';

const AdminLayout: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    setLoading(true);
    dispatch(adminFirstLoad())
      .unwrap()
      .catch(errorManager)
      .then(() => {
        setLoading(false);
      });
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
