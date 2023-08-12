import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminLayoutWrapper } from '@hoc/AdminLayout/style';

const AdminLayout: React.FC = () => {
  return (
    <AdminLayoutWrapper>
      <Outlet/>
    </AdminLayoutWrapper>
  );
};

export default AdminLayout;
