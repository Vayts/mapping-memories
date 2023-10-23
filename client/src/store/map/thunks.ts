import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPublic } from '@src/api/api';
import { MAP_ROUTES } from '@constants/routes';
import { RootState } from '@src/store';
import { normalize } from 'normalizr';
import { memorialSchema } from '@src/store/memorials/schema';
import { memorialTypeSchema } from '@src/store/memorialTypes/schema';
import { citySchema } from '@src/store/cities/schema';

const MODULE_NAME = 'map';

export const getMapInfo = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const filters = (getState() as RootState).map.activeTypes;
      const response = await axiosPublic.get(`${MAP_ROUTES.GET_INFO}?filters=${filters.join('_%_')}`);
      const cities = normalize(response.data.cities, [citySchema]).entities;
      const memorials = normalize(response.data.memorials, [memorialSchema]).entities;
      const memorialTypes = normalize(response.data.memorialTypes, [memorialTypeSchema]).entities;

      return {
        ...cities,
        ...memorials,
        ...memorialTypes,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
