import { ICoreState } from '@src/store/core/types';
import { createSlice } from '@reduxjs/toolkit';
import { appFirstLoad } from '@src/store/core/thunks';

const initialState: ICoreState = {
  locale: 'uk',
  isLoading: true,
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setLocale: (state, { payload }) => {
      state.locale = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(appFirstLoad.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(appFirstLoad.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setLocale } = coreSlice.actions;
