import { axiosPrivate, axiosPublic } from '@src/api/api';

const MODULE_NAME = 'auth';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '@src/types/auth.types';
import { AUTH_ROUTES } from '@constants/routes';

export const login = createAsyncThunk(
  `${MODULE_NAME}/login`,
  async (values: ILogin, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(AUTH_ROUTES.LOGIN, values);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const refresh = createAsyncThunk(
  `${MODULE_NAME}/refresh`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.get(AUTH_ROUTES.REFRESH);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const logout = createAsyncThunk(
  `${MODULE_NAME}/logout`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get(AUTH_ROUTES.LOGOUT);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
