import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminMarkersState } from '@src/store/markerTypes/types';
import { IAdminCityMarker, IAdminMemorialMarker, IAdminMemorialType } from '@src/types/markers.types';

const initialState: IAdminMarkersState = {
  isLoading: true,
  cityMarkers: [],
  loadingItem: [],
  memorialMarkers: [],
  memorialTypes: [],
  currentMemorial: null,
  isAddEditCompleted: false,
};

export const memorialTypesSlice = createSlice({
  name: 'adminMarkers',
  initialState,
  reducers: {
    adminMarkersRequestEnd: (state) => {
      state.isLoading = false;
    },
    adminMarkersRequestStart: (state) => {
      state.isLoading = true;
    },
    setCityMarkers: (state, action: PayloadAction<IAdminCityMarker[]>) => {
      state.cityMarkers = action.payload;
    },
    setMemorialMarkers: (state, action: PayloadAction<IAdminMemorialMarker[]>) => {
      state.memorialMarkers = action.payload;
    },
    setMemorialTypes: (state, action: PayloadAction<IAdminMemorialType[]>) => {
      state.memorialTypes = action.payload;
    },
  },
});

export const {
  adminMarkersRequestStart,
  adminMarkersRequestEnd,
  setMemorialMarkers,
  setMemorialTypes,
} = memorialTypesSlice.actions;
