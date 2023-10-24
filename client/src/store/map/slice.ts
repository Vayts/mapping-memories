import { createSlice } from '@reduxjs/toolkit';
import { IMapState } from '@src/store/map/types';
import { getMapInfo } from '@src/store/map/thunks';

const initialState: IMapState = {
  isLoading: true,
  activeTypes: [],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setActiveTypes: (state, { payload }) => {
      if (state.activeTypes.includes(payload)) {
        state.activeTypes = state.activeTypes.filter((item) => item !== payload);
      } else {
        state.activeTypes = [...state.activeTypes, payload];
      }
    },
    resetActiveTypes: (state) => {
      state.activeTypes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMapInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMapInfo.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getMapInfo.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setActiveTypes, resetActiveTypes } = mapSlice.actions;
