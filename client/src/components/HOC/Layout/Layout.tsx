import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@src/components/Header/Header';
import { ILayoutProps } from '@hoc/Layout/types';
import { Container } from '@hoc/Layout/style';

const Layout: React.FC<ILayoutProps> = ({ withContainer = true }) => {
  return (
    <div>
      {withContainer ? (
        <>
          <Header/>
          <Container>
            <Outlet/>
          </Container>
        </>
      ) : (
        <>
          <Header/>
          <Outlet/>
        </>
      )}
    </div>
  );
};

export default Layout;
