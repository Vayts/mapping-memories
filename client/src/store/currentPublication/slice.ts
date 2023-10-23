import { createSlice } from '@reduxjs/toolkit';
import { getAdditionalPublications, getCurrentPublication } from '@src/store/currentPublication/thunks';
import { ICurrentPublicationState } from '@src/store/currentPublication/types';

const initialState: ICurrentPublicationState = {
  isLoading: true,
  currentPublication: null,
  asideData: [],
};

export const currentPublicationSlice = createSlice({
  name: 'currentPublication',
  initialState,
  reducers: {
    resetCurrentPublication: (state) => {
      state.currentPublication = null;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdditionalPublications.fulfilled, (state, { payload }) => {
        state.asideData = payload;
      })
      .addCase(getCurrentPublication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentPublication.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentPublication.fulfilled, (state, { payload }) => {
        state.currentPublication = payload;
        state.isLoading = false;
      });
  },
});

export const {
  resetCurrentPublication
} = currentPublicationSlice.actions;
