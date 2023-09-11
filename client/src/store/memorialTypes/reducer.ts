import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminMarkerTypesState } from '@src/store/memorialTypes/types';
import { IAdminMemorialType } from '@src/types/markers.types';

const initialState: IAdminMarkerTypesState = {
  isLoading: true,
  loadingItems: [],
  data: [],
};

export const adminMemorialTypesSlice = createSlice({
  name: 'memorialTypes',
  initialState,
  reducers: {
    adminMemorialTypesRequestEnd: (state) => {
      state.isLoading = false;
    },
    adminMemorialTypesRequestStart: (state) => {
      state.isLoading = true;
    },
    setMemorialTypes: (state, action: PayloadAction<IAdminMemorialType[]>) => {
      state.data = action.payload;
    },
    manageLoadingMemorialTypesIds: (state, action: PayloadAction<string>) => {
      if (state.loadingItems.includes(action.payload)) {
        state.loadingItems = state.loadingItems.filter((item) => item !== action.payload);
      } else {
        state.loadingItems.push(action.payload);
      }
    },
  },
});

export const {
  adminMemorialTypesRequestEnd,
  manageLoadingMemorialTypesIds,
  adminMemorialTypesRequestStart,
  setMemorialTypes,
} = adminMemorialTypesSlice.actions;
