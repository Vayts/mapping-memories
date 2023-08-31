import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { THEMES } from '@constants/themes';
import { Route, Routes } from 'react-router-dom';
import Layout from '@hoc/Layout/Layout';
import MapPage from '@src/pages/MapPage/MapPage';
import AdminLayout from '@hoc/AdminLayout/AdminLayout';
import { AppWrapper } from '@src/components/App/style';
import { ToastContainer } from 'react-toastify';
import CreatePublicationPage from '@src/pages/CreatePublication/CreatePublicationPage';
import PublicationsPage from '@src/pages/PublicationsPage/PublicationsPage';
import PublicationPage from '@src/pages/PublicationPage/PublicationPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={THEMES.light}>
      <AppWrapper>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<PublicationsPage withFavorite={false}/>}/>
            <Route path='/interviews' element={<PublicationsPage type='interview' withFavorite/>}/>
            <Route path='/art-projects' element={<PublicationsPage type='artProject' withFavorite/>}/>
            <Route path='/special-projects' element={<PublicationsPage type='specialProject' withFavorite/>}/>
            <Route path='/publication/:id' element={<PublicationPage/>}/>
          </Route>
          <Route path='/' element={<Layout withContainer={false}/>}>
            <Route path='/map' element={<MapPage/>}/>
          </Route>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route path='/admin/create-interview' element={<CreatePublicationPage/>}/>
          </Route>
        </Routes>
        <ToastContainer
          position="bottom-right"
          limit={3}
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable={false}
          theme="colored"
        />
      </AppWrapper>
    </ThemeProvider>
  );
};
