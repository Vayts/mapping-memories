import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '@src/api/api';
import { ICityMarker, ICityMarkerDto } from '@src/types/markers.types';
import { CITY_ROUTES } from '@constants/routes';
import { normalize } from 'normalizr';
import { citySchema } from '@src/store/cities/schema';
import { RootState } from '@src/store';
import { setLoadingCities } from '@src/store/cities/slice';

const MODULE_NAME = 'cities';

export const getAllCities = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<ICityMarker[]>(CITY_ROUTES.GET);
      
      const indexedCities = response.data.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      
      const result = normalize(indexedCities, [citySchema]);
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const deleteCity = createAsyncThunk(
  `${MODULE_NAME}/delete`,
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(setLoadingCities(id));
      await axiosPrivate.delete(`${CITY_ROUTES.DELETE}/${id}`);
      await dispatch(setLoadingCities(id));
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
export const editCity = createAsyncThunk(
  `${MODULE_NAME}/edit`,
  async ({ values, id } : {id: string, values: ICityMarkerDto}, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put<ICityMarker[]>(`${CITY_ROUTES.EDIT}/${id}`, values);
      
      const result = normalize(response.data, citySchema);
      
      return {
        city: result.entities.cities?.[result.result] as ICityMarker,
        id,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const createCity = createAsyncThunk(
  `${MODULE_NAME}/create`,
  async (values: ICityMarkerDto, { rejectWithValue, getState }) => {
    try {
      const response = await axiosPrivate.post<ICityMarker[]>(CITY_ROUTES.ADD, values);

      const citiesLength = (getState() as RootState).cities.ids.length;
      const addedCity = {
        ...response.data,
        index: citiesLength + 1,
      };
      const result = normalize(addedCity, citySchema);
    
      return result.entities.cities?.[result.result] as ICityMarker;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
