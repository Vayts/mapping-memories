import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const createPublicationSlice = createSlice({
  name: 'createPublication',
  initialState,
  reducers: {
    createPublicationRequestStart: (state) => {
      state.isLoading = true;
    },
    createPublicationRequestEnd: (state) => {
      state.isLoading = true;
    },
  },
});

export const { createPublicationRequestStart, createPublicationRequestEnd } = createPublicationSlice.actions;
