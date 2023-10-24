import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { ICityMarker } from '@src/types/markers.types';
import { createCity, deleteCity, editCity, getAllCities } from '@src/store/cities/thunks';
import { ICityMarkersState } from '@src/store/cities/types';
import { getMapInfo } from '@src/store/map/thunks';

const initialState: ICityMarkersState = {
  isLoading: true,
  loadingItems: [],
};

export const citiesAdapter = createEntityAdapter<ICityMarker>({ selectId: (entity) => entity?._id });

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: citiesAdapter.getInitialState(initialState),
  reducers: {
    setLoadingCities: (state, { payload }) => {
      if (state.loadingItems.includes(payload)) {
        state.loadingItems = state.loadingItems.filter((item) => item !== payload);
      } else {
        state.loadingItems = [...state.loadingItems, payload];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCities.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCities.fulfilled, (state, { payload }) => {
        citiesAdapter.setAll(state, payload.cities ?? {});
        state.isLoading = false;
      })
      .addCase(deleteCity.fulfilled, (state, { payload }) => {
        citiesAdapter.removeOne(state, payload);
      })
      .addCase(createCity.fulfilled, (state, { payload }) => {
        citiesAdapter.upsertOne(state, payload as ICityMarker);
      })
      .addCase(editCity.fulfilled, (state, { payload }) => {
        citiesAdapter.updateOne(state, { id: payload.id, changes: { ...payload.city } });
      })
      .addCase(getMapInfo.fulfilled, (state, { payload }) => {
        citiesAdapter.setAll(state, payload.cities ?? {});
      });
  },
});

export const { setLoadingCities } = citiesSlice.actions;
