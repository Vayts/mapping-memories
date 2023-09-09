import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState } from '@src/store/app/types';
import { LocaleType } from '@src/types/locale.types';

const initialState: IAppState = {
  isLoading: true,
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
    setLocale: (state, action: PayloadAction<LocaleType>) => {
      state.locale = action.payload;
    },
  },
});

export const { appRequestEnd, appRequestStart, setLocale } = appSlice.actions;
