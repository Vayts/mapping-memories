import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IMemorialType } from '@src/types/markers.types';
import { IMemorialTypesState } from '@src/store/memorialTypes/types';
import {
  createMemorialType,
  deleteMemorialType,
  editMemorialType,
  getAllMemorialTypes,
} from '@src/store/memorialTypes/thunks';
import { getMapInfo } from '@src/store/map/thunks';

const initialState: IMemorialTypesState = {
  isLoading: true,
  loadingItems: [],
};

export const memorialTypesAdapter = createEntityAdapter<IMemorialType>({ selectId: (entity) => entity?._id });

export const memorialTypesSlice = createSlice({
  name: 'memorialTypes',
  initialState: memorialTypesAdapter.getInitialState(initialState),
  reducers: {
    setLoadingMemorialTypes: (state, { payload }) => {
      if (state.loadingItems.includes(payload)) {
        state.loadingItems = state.loadingItems.filter((item) => item !== payload);
      } else {
        state.loadingItems = [...state.loadingItems, payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMemorialTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMemorialTypes.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllMemorialTypes.fulfilled, (state, { payload }) => {
        memorialTypesAdapter.setAll(state, payload.memorialTypes ?? {});
        state.isLoading = false;
      })
      .addCase(deleteMemorialType.fulfilled, (state, { payload }) => {
        memorialTypesAdapter.removeOne(state, payload);
      })
      .addCase(createMemorialType.fulfilled, (state, { payload }) => {
        memorialTypesAdapter.upsertOne(state, payload as IMemorialType);
      })
      .addCase(getMapInfo.fulfilled, (state, { payload }) => {
        memorialTypesAdapter.setAll(state, payload.memorialTypes ?? {});
      })
      .addCase(editMemorialType.fulfilled, (state, { payload }) => {
        memorialTypesAdapter.updateOne(state, { id: payload.id, changes: { ...payload.memorialType } });
      });
  },
});

export const { setLoadingMemorialTypes } = memorialTypesSlice.actions;
