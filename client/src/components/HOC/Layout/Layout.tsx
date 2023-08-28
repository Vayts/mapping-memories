import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@src/components/Header/Header';
import { ILayoutProps } from '@hoc/Layout/types';
import Footer from '@src/components/Footer/Footer';
import * as S from './style';

const Layout: React.FC<ILayoutProps> = ({ withContainer = true }) => {
  return (
    <div>
      {withContainer ? (
        <>
          <Header isFixed/>
          <S.Container>
            <Outlet/>
            <Footer/>
          </S.Container>
        </>
      ) : (
        <>
          <Header isFixed={false}/>
          <Outlet/>
        </>
      )}
    </div>
  );
};

export default Layout;
