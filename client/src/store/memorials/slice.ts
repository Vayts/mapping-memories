import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IMemorialMarker } from '@src/types/markers.types';
import { IMemorialsState } from '@src/store/memorials/types';
import {
  createMemorial,
  deleteMemorial,
  editMemorial,
  getAllMemorials,
  getCurrentMemorial,
} from '@src/store/memorials/thunks';
import { getMapInfo } from '@src/store/map/thunks';

const initialState: IMemorialsState = {
  isLoading: true,
  currentMemorial: null,
  loadingItems: [],
};

export const memorialsAdapter = createEntityAdapter<IMemorialMarker>({ selectId: (entity) => entity?._id });

export const memorialsSlice = createSlice({
  name: 'memorials',
  initialState: memorialsAdapter.getInitialState(initialState),
  reducers: {
    setLoadingMemorial: (state, { payload }) => {
      if (state.loadingItems.includes(payload)) {
        state.loadingItems = state.loadingItems.filter((item) => item !== payload);
      } else {
        state.loadingItems = [...state.loadingItems, payload];
      }
    },
    resetCurrentMemorial: (state) => {
      state.currentMemorial = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMemorials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMemorials.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllMemorials.fulfilled, (state, { payload }) => {
        memorialsAdapter.setAll(state, payload.memorials ?? {});
        state.isLoading = false;
      })
      .addCase(createMemorial.fulfilled, (state, { payload }) => {
        memorialsAdapter.upsertOne(state, payload as IMemorialMarker);
      })
      .addCase(editMemorial.fulfilled, (state, { payload }) => {
        memorialsAdapter.updateOne(state, { id: payload.id, changes: { ...payload.memorial } });
      })
      .addCase(deleteMemorial.fulfilled, (state, { payload }) => {
        memorialsAdapter.removeOne(state, payload);
      })
      .addCase(getMapInfo.fulfilled, (state, { payload }) => {
        memorialsAdapter.setAll(state, payload.memorials ?? {});
      })
      .addCase(getCurrentMemorial.fulfilled, (state, { payload }) => {
        state.currentMemorial = payload;
      });
  },
});

export const { setLoadingMemorial, resetCurrentMemorial } = memorialsSlice.actions;
