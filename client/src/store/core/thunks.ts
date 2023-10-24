import { createAsyncThunk } from '@reduxjs/toolkit';
import { refresh } from '@src/store/auth/thunks';
import { LocaleType } from '@src/types/locale.types';
import { setLocale } from '@src/store/core/slice';
import { LANGUAGE } from '@constants/locale';
import { getAllPublications } from '@src/store/publications/thunks';
import { getAllMemorials } from '@src/store/memorials/thunks';
import { getAllCities } from '@src/store/cities/thunks';
import { getAllMemorialTypes } from '@src/store/memorialTypes/thunks';

const MODULE_NAME = 'core';

export const appFirstLoad = createAsyncThunk(
  `${MODULE_NAME}/firstLoad`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const language: LocaleType = localStorage.getItem('lang') as LocaleType || 'uk';
      dispatch(setLocale(LANGUAGE.includes(language) ? language : 'uk'));
      return true;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const adminFirstLoad = createAsyncThunk(
  `${MODULE_NAME}/adminFirstLoad`,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(refresh());
      await dispatch(getAllPublications());
      await dispatch(getAllMemorials());
      await dispatch(getAllCities());
      await dispatch(getAllMemorialTypes());

      return true;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
