import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INTERVIEW_PAGE_CONFIG } from '@constants/interview';
import { IInterviewState } from '@src/store/interview/types';
import { IInterview } from '@src/types/interview.types';

const initialState: IInterviewState = {
  isInSearch: false,
  searchValue: '',
  isLoading: true,
  data: [],
  favoriteInterviews: [],
  limit: INTERVIEW_PAGE_CONFIG.PER_PAGE,
  hasMoreContent: false,
};

export const interviewsSlice = createSlice({
  name: 'interviewsSlice',
  initialState,
  reducers: {
    interviewsRequestStart: (state) => {
      state.isLoading = true;
    },
    interviewsRequestEnd: (state) => {
      state.isLoading = false;
    },
    setInterviewsSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetLimitAndData: (state) => {
      state.limit = initialState.limit;
    },
    setFavoriteInterviews: (state, action: PayloadAction<IInterview[]>) => {
      state.favoriteInterviews = [...action.payload];
    },
    addInterviewsLimit: (state) => {
      state.limit += INTERVIEW_PAGE_CONFIG.PER_PAGE;
    },
    addInterviews: (state, action: PayloadAction<IInterview[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    setInterviews: (state, action: PayloadAction<IInterview[]>) => {
      state.data = [...action.payload];
    },
    setInSearch: (state, action: PayloadAction<boolean>) => {
      state.isInSearch = action.payload;
    },
    setInterviewHasMoreContent: (state, action: PayloadAction<boolean>) => {
      state.hasMoreContent = action.payload;
    },
  },
});

export const {
  addInterviews,
  interviewsRequestEnd,
  resetLimitAndData,
  setInterviewsSearchValue,
  interviewsRequestStart,
  setInSearch,
  setInterviewHasMoreContent,
  setInterviews,
  setFavoriteInterviews,
  addInterviewsLimit,
} = interviewsSlice.actions;
