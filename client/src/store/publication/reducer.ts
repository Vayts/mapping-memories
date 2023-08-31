import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublication } from '@src/types/publication.types';
import { IPublicationState } from '@src/store/publication/types';

const initialState: IPublicationState = {
  isLoading: true,
  currentPublication: null,
  asideData: [],
};

export const currentPublicationSlice = createSlice({
  name: 'publicationSlice',
  initialState,
  reducers: {
    currentPublicationRequestStart: (state) => {
      state.isLoading = true;
    },
    currentPublicationRequestEnd: (state) => {
      state.isLoading = true;
    },
    setCurrentPublication: (state, action: PayloadAction<IPublication>) => {
      state.currentPublication = action.payload;
    },
    resetCurrentPublication: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  currentPublicationRequestStart,
  resetCurrentPublication,
  currentPublicationRequestEnd,
  setCurrentPublication,
} = currentPublicationSlice.actions;
