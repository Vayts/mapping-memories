import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import { THEMES } from '@constants/themes';
import { Route, Routes } from 'react-router-dom';
import Layout from '@hoc/Layout/Layout';
import { AppWrapper } from '@src/components/App/style';
import { ToastContainer } from 'react-toastify';
import PublicationsPage from '@src/pages/PublicationsPage/PublicationsPage';
import { useAppDispatch } from '@src/hooks/hooks';
import AboutUsPage from '@src/pages/AboutUsPage/AboutUsPage';
import PageNotFound from '@src/pages/PageNotFound/PageNotFound';
import { appFirstLoad } from '@src/store/core/thunks';
import { PublicationEnum } from '@src/types/publication.types';
import AdminLayout from '@hoc/AdminLayout/AdminLayout';
import { LoginPage } from '@src/pages/LoginPage/LoginPage';
import RequireAuth from '@hoc/RequireAuth/RequireAuth';
import { withSuspense } from '@hoc/WithSuspense/WithSuspense';

const AdminPublicationsPage = withSuspense(React.lazy(() => import('@src/pages/AdminPublicationsPage/AdminPublicationsPage')));
const CreatePublicationPage = withSuspense(React.lazy(() => import('@src/pages/CreatePublicationPage/CreatePublicationPage')));
const EditPublicationPage = withSuspense(React.lazy(() => import('@src/pages/EditPublicationPage/EditPublicationPage')));
const AddEditMemorialPage = withSuspense(React.lazy(() => import('@src/pages/AddEditMemorialPage/AddEditMemorialPage')));
const AdminMemorialsPage = withSuspense(React.lazy(() => import('@src/pages/AdminMemorialsPage/AdminMemorialsPage')));
const AdminCityMarkerPage = withSuspense(React.lazy(() => import('@src/pages/AdminCityMarkerPage/AdminCityMarkerPage')));
const AdminMemorialTypesPage = withSuspense(React.lazy(() => import('@src/pages/AdminMemorialTypesPage/AdminMemorialTypesPage')));
const PublicationPage = withSuspense(React.lazy(() => import('@src/pages/PublicationPage/PublicationPage')));
const MapPage = withSuspense(React.lazy(() => import('@src/pages/MapPage/MapPage')));

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(appFirstLoad());
  }, []);
  
  return (
    <ThemeProvider theme={THEMES.light}>
      <AppWrapper>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='/' element={<PublicationsPage withFavorite={false}/>}/>
            <Route path='/interviews' element={<PublicationsPage type={PublicationEnum.Interview} withFavorite/>}/>
            <Route path='/about-us' element={<AboutUsPage/>}/>
            <Route path='/art-projects' element={<PublicationsPage type={PublicationEnum.ArtProject} withFavorite/>}/>
            <Route path='/special-projects' element={<PublicationsPage type={PublicationEnum.SpecialProject} withFavorite/>}/>
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
              <Route path='/mapmem-admin/memorials/edit/:id' element={<AddEditMemorialPage/>}/>
            </Route>
          </Route>
          <Route path='*' element={<PageNotFound/>} />
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
