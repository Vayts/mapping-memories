import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '@src/store/user/types';
import { IUser } from '@src/types/user.types';

const initialState: IUserState = {
  data: null,
  isTokenRefreshing: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser| null>) => {
      state.data = action.payload;
    },
    refreshRequest: (state) => {
      state.isTokenRefreshing = true;
    },
    refreshRequestError: (state) => {
      state.isTokenRefreshing = false;
      state.data = null;
    },
    refreshRequestSuccess: (state) => {
      state.isTokenRefreshing = false;
    },
  },
});

export const { setUser, refreshRequest, refreshRequestError, refreshRequestSuccess } = userSlice.actions;
