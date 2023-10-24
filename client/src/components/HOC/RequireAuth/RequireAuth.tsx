import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@src/hooks/hooks';
import AdminMenu from '@hoc/RequireAuth/AdminMenu/AdminMenu';
import { selectUser } from '@src/store/auth/selectors';
import * as S from './style';

const RequireAuth: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
	
  useEffect(() => {
    if (!user) {
      navigate('/mapmem-admin/login');
    }
  }, [user]);
	
  return (
    user ? (
      <S.Container>
        <S.AdminAsideContent>
          <AdminMenu/>
        </S.AdminAsideContent>
        <S.AdminMainContent>
          <Outlet/>
        </S.AdminMainContent>
      </S.Container>
    ) : null
  );
};

export default RequireAuth;
