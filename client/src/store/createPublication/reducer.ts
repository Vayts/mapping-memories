import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreatePublicationState } from '@src/store/createPublication/types';

const initialState: ICreatePublicationState = {
  isLoading: false,
  hasBeenAdded: false,
};

export const createPublicationSlice = createSlice({
  name: 'createPublication',
  initialState,
  reducers: {
    createPublicationRequestStart: (state) => {
      state.isLoading = true;
    },
    createPublicationRequestEnd: (state) => {
      state.isLoading = false;
    },
    setPublicationHasBeenAdded: (state, action: PayloadAction<boolean>) => {
      state.hasBeenAdded = action.payload;
    },
  },
});

export const { createPublicationRequestStart, setPublicationHasBeenAdded, createPublicationRequestEnd } = createPublicationSlice.actions;
