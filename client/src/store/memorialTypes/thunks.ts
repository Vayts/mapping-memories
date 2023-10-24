import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '@src/api/api';
import { IMemorialType, IMemorialTypeDto } from '@src/types/markers.types';
import { MEMORIAL_TYPE_ROUTES } from '@constants/routes';
import { normalize } from 'normalizr';
import { RootState } from '@src/store';
import { memorialTypeSchema } from '@src/store/memorialTypes/schema';
import { setLoadingMemorialTypes } from '@src/store/memorialTypes/slice';

const MODULE_NAME = 'memorialTypes';

export const getAllMemorialTypes = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<IMemorialType[]>(MEMORIAL_TYPE_ROUTES.GET);
      
      const indexedMemorialTypes = response.data.map((item, index) => {
        return {
          ...item,
          index: index + 1,
        };
      });
      
      const result = normalize(indexedMemorialTypes, [memorialTypeSchema]);
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const deleteMemorialType = createAsyncThunk(
  `${MODULE_NAME}/delete`,
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(setLoadingMemorialTypes(id));
      await axiosPrivate.delete(`${MEMORIAL_TYPE_ROUTES.DELETE}/${id}`);
      await dispatch(setLoadingMemorialTypes(id));
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
export const editMemorialType = createAsyncThunk(
  `${MODULE_NAME}/edit`,
  async ({ values, id } : {id: string, values: IMemorialTypeDto}, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put<IMemorialType[]>(`${MEMORIAL_TYPE_ROUTES.EDIT}/${id}`, values);
      
      const result = normalize(response.data, memorialTypeSchema);
      
      return {
        memorialType: result.entities.memorialTypes?.[result.result] as IMemorialType,
        id,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const createMemorialType = createAsyncThunk(
  `${MODULE_NAME}/create`,
  async (values: IMemorialTypeDto, { rejectWithValue, getState }) => {
    try {
      const response = await axiosPrivate.post<IMemorialType[]>(MEMORIAL_TYPE_ROUTES.ADD, values);
      const memorialTypesLength = (getState() as RootState).memorialTypes.ids.length;
      const addedType = {
        ...response.data,
        index: memorialTypesLength + 1,
      };
      const result = normalize(addedType, memorialTypeSchema);
 
      return result.entities.memorialTypes?.[result.result] as IMemorialType;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
