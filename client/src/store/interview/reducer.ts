import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  interviews: [],
  favoriteInterviews: [],
};

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    interviewRequestStart: (state) => {
      state.isLoading = true;
    },
    interviewRequestEnd: (state) => {
      state.isLoading = false;
    },
    setInterviews: (state, action) => {
      state.interviews = action.payload;
    },
    setFavoriteInterviews: (state, action) => {
      state.favoriteInterviews = action.payload;
    },
  },
});

export const { interviewRequestStart, setFavoriteInterviews, interviewRequestEnd, setInterviews } = interviewSlice.actions;
