import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  data: {
    login: '',
    password: '',
  },
  isLoading: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginData: (state, action: PayloadAction<Record<string, string>>) => {
      state.data[action.payload.key as 'login' | 'password'] = action.payload.value;
    },
    loginRequestStart: (state) => {
      state.isLoading = true;
    },
    loginRequestEnd: (state) => {
      state.isLoading = false;
    },
    resetLogin: (state) => {
      Object.assign(state, initialState);
    },
  },
});
export const { setLoginData, loginRequestStart, loginRequestEnd, resetLogin } = loginSlice.actions;
