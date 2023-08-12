import { IMapState } from '@src/store/map/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IMapState = {
  zoom: 0,
  coords: {
    lat: 48.4,
    lng: 32.65,
  },
  types: [],
  activeTypes: [],
  markers: {
    cities: [],
    memorials: [],
  },
  isLoading: false,
};
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    mapRequestStart: (state) => {
      state.isLoading = true;
    },
    mapRequestEnd: (state) => {
      state.isLoading = false;
    },
    setMapInfo: (state, action) => {
      state.markers.memorials = action.payload.memorials;
      state.types = action.payload.types;
      state.markers.cities = action.payload.cities;
    },
    setActiveTypes: (state, action) => {
      state.activeTypes = action.payload;
    },
  },
});

export const { mapRequestStart, mapRequestEnd, setMapInfo, setActiveTypes } = mapSlice.actions;
