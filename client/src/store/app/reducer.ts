import { createSlice } from '@reduxjs/toolkit';
import { IAppState } from '@src/store/app/types';

const initialState: IAppState = {
  isLoading: false,
  locale: 'uk',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appRequestEnd: (state) => {
      state.isLoading = false;
    },
    appRequestStart: (state) => {
      state.isLoading = true;
    },
  },
});

export const { appRequestEnd, appRequestStart } = appSlice.actions;
