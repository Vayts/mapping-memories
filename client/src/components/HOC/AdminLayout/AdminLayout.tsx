import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayoutWrapper } from '@hoc/AdminLayout/style';
import { Container } from './style';

const AdminLayout: React.FC = () => {
  return (
    <AdminLayoutWrapper>
      <Container>
        <Outlet/>
      </Container>
    </AdminLayoutWrapper>
  );
};

export default AdminLayout;
