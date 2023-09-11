import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminCityMarker } from '@src/types/markers.types';
import { ICityMarkersState } from '@src/store/cityMarkers/types';

const initialState: ICityMarkersState = {
  isLoading: true,
  data: [],
  loadingItems: [],
};

export const cityMarkersSlice = createSlice({
  name: 'cityMarkers',
  initialState,
  reducers: {
    cityMarkersRequestEnd: (state) => {
      state.isLoading = false;
    },
    cityMarkersRequestStart: (state) => {
      state.isLoading = true;
    },
    setCityMarkers: (state, action: PayloadAction<IAdminCityMarker[]>) => {
      state.data = action.payload;
    },
    setCityLoadingItem: (state, action: PayloadAction<string[]>) => {
      state.loadingItems = action.payload;
    },
  },
});

export const {
  setCityMarkers,
  cityMarkersRequestStart,
  setCityLoadingItem,
  cityMarkersRequestEnd,
} = cityMarkersSlice.actions;
