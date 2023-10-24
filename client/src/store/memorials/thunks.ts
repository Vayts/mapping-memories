import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '@src/api/api';
import { MEMORIAL_ROUTES } from '@constants/routes';
import { normalize } from 'normalizr';
import { memorialSchema } from '@src/store/memorials/schema';
import { ICreateMemorialDto, IMemorialMarker } from '@src/types/markers.types';
import { setLoadingMemorial } from '@src/store/memorials/slice';
import { getCreateMemorialFormData } from '@helpers/createMemorial.helper';
import { RootState } from '@src/store';

const MODULE_NAME = 'memorials';

export const getAllMemorials = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<IMemorialMarker[]>(MEMORIAL_ROUTES.GET_ALL);
      
      const indexedMemorials = response.data.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      
      const result = normalize(indexedMemorials, [memorialSchema]);
      
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const createMemorial = createAsyncThunk(
  `${MODULE_NAME}/create`,
  async (values: ICreateMemorialDto, { rejectWithValue, getState }) => {
    const formData = getCreateMemorialFormData(values);
    try {
      const response = await axiosPrivate.postForm<IMemorialMarker>(MEMORIAL_ROUTES.ADD, formData);
      const memorialsLength = (getState() as RootState).memorials.ids.length;
      const addedMemorial = {
        ...response.data,
        index: memorialsLength + 1,
      };
      const result = normalize(addedMemorial, memorialSchema);
      return result.entities.memorials?.[result.result] as IMemorialMarker;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const editMemorial = createAsyncThunk(
  `${MODULE_NAME}/edit`,
  async ({ values, id }: {values: ICreateMemorialDto, id: string}, { rejectWithValue }) => {
    const formData = getCreateMemorialFormData(values);
    try {
      const response = await axiosPrivate.putForm<IMemorialMarker>(`${MEMORIAL_ROUTES.EDIT}/${id}`, formData);
      
      const result = normalize(response.data, memorialSchema);
      return {
        memorial: result.entities.memorials?.[result.result] as IMemorialMarker,
        id,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getCurrentMemorial = createAsyncThunk(
  `${MODULE_NAME}/getCurrent`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<IMemorialMarker>(`${MEMORIAL_ROUTES.GET}/${id}`);

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const deleteMemorial = createAsyncThunk(
  `${MODULE_NAME}/delete`,
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(setLoadingMemorial(id));
      await axiosPrivate.delete(`${MEMORIAL_ROUTES.DELETE}/${id}`);
      await dispatch(setLoadingMemorial(id));
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
