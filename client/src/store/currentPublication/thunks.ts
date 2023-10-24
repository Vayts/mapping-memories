import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic } from '@src/api/api';
import { PUBLICATION_ROUTES } from '@constants/routes';

const MODULE_NAME = 'currentPublication';

export const getAdditionalPublications = createAsyncThunk(
  `${MODULE_NAME}/getAdditional`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.get(`${PUBLICATION_ROUTES.GET_ADDITIONAL}?publication_id=${id}`);
      
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getCurrentPublication = createAsyncThunk(
  `${MODULE_NAME}/getCurrentPublication`,
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(getAdditionalPublications(id));
      
      const response = await axiosPublic.get(`${PUBLICATION_ROUTES.GET}/${id}`);
      
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
