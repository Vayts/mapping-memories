import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminMemorialMarker, IMemorialMarker } from '@src/types/markers.types';
import { IMemorialMarkersState } from '@src/store/memorialMarkers/types';

const initialState: IMemorialMarkersState = {
  isLoading: true,
  data: [],
  loadingItems: [],
  isAddEditCompleted: false,
  currentMemorial: null,
};

export const memorialMarkersSlice = createSlice({
  name: 'cityMarkers',
  initialState,
  reducers: {
    adminMemorialMarkersRequestEnd: (state) => {
      state.isLoading = false;
    },
    adminMemorialMarkersRequestStart: (state) => {
      state.isLoading = true;
    },
    setMemorialMarkers: (state, action: PayloadAction<IAdminMemorialMarker[]>) => {
      state.data = action.payload;
    },
    setMemorialLoadingItem: (state, action: PayloadAction<string[]>) => {
      state.loadingItems = action.payload;
    },
    setIsAddEditCompleted: (state, action: PayloadAction<boolean>) => {
      state.isAddEditCompleted = action.payload;
    },
    setCurrentMemorial: (state, action: PayloadAction<IMemorialMarker | null>) => {
      state.currentMemorial = action.payload;
    },
    manageLoadingMemorialIds: (state, action: PayloadAction<string>) => {
      if (state.loadingItems.includes(action.payload)) {
        state.loadingItems = state.loadingItems.filter((item) => item !== action.payload);
      } else {
        state.loadingItems.push(action.payload);
      }
    },
  },
});

export const {
  adminMemorialMarkersRequestEnd,
  adminMemorialMarkersRequestStart,
  setMemorialLoadingItem,
  setMemorialMarkers,
  setIsAddEditCompleted,
  setCurrentMemorial,
  manageLoadingMemorialIds,
} = memorialMarkersSlice.actions;
