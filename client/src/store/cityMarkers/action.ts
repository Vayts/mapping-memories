import { createAction } from '@reduxjs/toolkit';
import { CITY_MARKERS_AT } from '@constants/actions';
import { ICityMarkerDto } from '@src/types/markers.types';

export const getCityMarkersRequest = createAction(CITY_MARKERS_AT.GET_CITY_MARKERS);

export const addCityMarkerRequest = createAction(CITY_MARKERS_AT.ADD_CITY_MARKER, (values: ICityMarkerDto) => {
  return { payload: { values } };
});
export const editCityMarkerRequest = createAction(CITY_MARKERS_AT.EDIT_CITY_MARKER, (values: ICityMarkerDto, id: string) => {
  return { payload: { values, id } };
});

export const deleteCityMarkerRequest = createAction(CITY_MARKERS_AT.DELETE_CITY_MARKER, (id: string) => {
  return { payload: { id } };
});
