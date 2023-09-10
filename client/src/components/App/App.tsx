import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { THEMES } from '@constants/themes';
import { Route, Routes } from 'react-router-dom';
import Layout from '@hoc/Layout/Layout';
import MapPage from '@src/pages/MapPage/MapPage';
import AdminLayout from '@hoc/AdminLayout/AdminLayout';
import { AppWrapper } from '@src/components/App/style';
import { ToastContainer } from 'react-toastify';
import PublicationsPage from '@src/pages/PublicationsPage/PublicationsPage';
import PublicationPage from '@src/pages/PublicationPage/PublicationPage';
import { useAppDispatch } from '@src/hooks/hooks';
import { setLocale } from '@src/store/app/reducer';
import { LANGUAGE } from '@constants/locale';
import { LocaleType } from '@src/types/locale.types';
import CreatePublicationPage from '@src/pages/CreatePublicationPage/CreatePublicationPage';
import RequireAuth from '@hoc/RequireAuth/RequireAuth';
import AdminPublicationsPage from '@src/pages/AdminPublicationsPage/AdminPublicationsPage';
import EditPublicationPage from '@src/pages/EditPublicationPage/EditPublicationPage';
import { LoginPage } from '@src/pages/LoginPage/LoginPage';
import AdminCityMarkerPage from '@src/pages/AdminCityMarkerPage/AdminCityMarkerPage';
import AdminMemorialsPage from '@src/pages/AdminMemorialsPage/AdminMemorialsPage';
import AddEditMemorialPage from '@src/pages/AddEditMemorialPage/AddEditMemorialPage';
import AdminMemorialTypesPage from '@src/pages/AdminMemorialTypesPage/AdminMemorialTypesPage';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const language: LocaleType = localStorage.getItem('mapMemLang') as LocaleType || 'uk';
    dispatch(setLocale(LANGUAGE.includes(language) ? language : 'uk'));
  }, []);
  
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
          <Route path='/mapmem-admin' element={<AdminLayout/>}>
            <Route path='/mapmem-admin/login' element={<LoginPage/>} />
            <Route path='/mapmem-admin' element={<RequireAuth/>}>
              <Route path='/mapmem-admin/publications' element={<AdminPublicationsPage/>}/>
              <Route path='/mapmem-admin/publications/add' element={<CreatePublicationPage/>}/>
              <Route path='/mapmem-admin/publications/edit/:id' element={<EditPublicationPage/>}/>
              
              <Route path='/mapmem-admin/city-markers' element={<AdminCityMarkerPage/>}/>
              
              <Route path='/mapmem-admin/memorial-types' element={<AdminMemorialTypesPage/>}/>
              
              <Route path='/mapmem-admin/memorials' element={<AdminMemorialsPage/>}/>
              <Route path='/mapmem-admin/memorials/add' element={<AddEditMemorialPage/>}/>
              <Route path='/mapmem-admin/memorials/edit/:id' element={<AddEditMemorialPage isInEditMode/>}/>
            </Route>
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
