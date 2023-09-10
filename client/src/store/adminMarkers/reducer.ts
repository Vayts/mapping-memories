import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminMarkersState } from '@src/store/adminMarkers/types';
import { IAdminCityMarker, IAdminMemorialMarker, IAdminMemorialType, IMemorialMarker } from '@src/types/markers.types';

const initialState: IAdminMarkersState = {
  isLoading: true,
  cityMarkers: [],
  loadingItem: [],
  memorialMarkers: [],
  memorialTypes: [],
  currentMemorial: null,
  isAddEditCompleted: false,
};

export const adminMarkersSlice = createSlice({
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
    setIsAddEditCompleted: (state, action: PayloadAction<boolean>) => {
      state.isAddEditCompleted = action.payload;
    },
    setCurrentMemorial: (state, action: PayloadAction<IMemorialMarker | null>) => {
      state.currentMemorial = action.payload;
    },
  },
});

export const {
  adminMarkersRequestStart,
  adminMarkersRequestEnd,
  setCityMarkers,
  setMemorialMarkers,
  setMemorialTypes,
  setCurrentMemorial,
  setIsAddEditCompleted,
} = adminMarkersSlice.actions;
