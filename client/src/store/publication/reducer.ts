import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublication } from '@src/types/publication.types';
import { IPublicationState } from '@src/store/publication/types';

const initialState: IPublicationState = {
  isLoading: true,
  currentPublication: null,
  asideData: [],
  asideIsLoading: true,
};

export const currentPublicationSlice = createSlice({
  name: 'publicationSlice',
  initialState,
  reducers: {
    currentPublicationRequestStart: (state) => {
      state.isLoading = true;
    },
    currentPublicationRequestEnd: (state) => {
      state.isLoading = false;
    },
    setCurrentPublication: (state, action: PayloadAction<IPublication>) => {
      state.currentPublication = action.payload;
    },
    resetCurrentPublication: (state) => {
      Object.assign(state, initialState);
    },
    setAsideData: (state, action: PayloadAction<IPublication[]>) => {
      state.asideData = action.payload;
    },
    setAsideLoading: (state, action: PayloadAction<boolean>) => {
      state.asideIsLoading = action.payload;
    },
  },
});

export const {
  currentPublicationRequestStart,
  resetCurrentPublication,
  currentPublicationRequestEnd,
  setCurrentPublication,
  setAsideData,
  setAsideLoading,
} = currentPublicationSlice.actions;
