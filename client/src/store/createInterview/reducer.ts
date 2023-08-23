import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const createInterviewSlice = createSlice({
  name: 'createInterview',
  initialState,
  reducers: {
    createInterviewRequestStart: (state) => {
      state.isLoading = true;
    },
    createInterviewRequestEnd: (state) => {
      state.isLoading = true;
    },
  },
});

export const { createInterviewRequestStart, createInterviewRequestEnd } = createInterviewSlice.actions;
