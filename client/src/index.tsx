import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from '@src/store';
import { Provider } from 'react-redux';
import { App } from './components/App/App';
import './i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='*' element={<App/>}/>
      </Routes>
    </Provider>
  </BrowserRouter>
  ,
);
