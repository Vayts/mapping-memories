import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuthState } from '@src/store/auth/types';
import { login, logout, refresh } from '@src/store/auth/thunks';
import { IUser } from '@src/types/user.types';

const initialState: IAuthState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(refresh.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
  },
});
