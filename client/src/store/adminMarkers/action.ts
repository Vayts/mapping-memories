import { createAction } from '@reduxjs/toolkit';
import { MARKERS_AT } from '@constants/actions';
import { ICreateMemorialDto, IMemorialTypeDto } from '@src/types/markers.types';

export const getAllMemorialMarkersRequest = createAction(MARKERS_AT.GET_ALL_MEMORIALS);

export const addMemorialMarkersRequest = createAction(MARKERS_AT.ADD_MEMORIAL_MARKER, (values: ICreateMemorialDto) => {
  return { payload: { values } };
});

export const deleteMemorialMarkerRequest = createAction(MARKERS_AT.DELETE_MEMORIAL_MARKER, (id: string) => {
  return { payload: { id } };
});

export const getAllMemorialTypesRequest = createAction(MARKERS_AT.GET_ALL_MEMORIAL_TYPES);

export const getCurrentMemorialRequest = createAction(MARKERS_AT.GET_CURRENT_MEMORIAL, (id: string) => {
  return { payload: { id } };
});

export const editMemorialMarkerRequest = createAction(MARKERS_AT.EDIT_MEMORIAL, (values: ICreateMemorialDto, id: string) => {
  return { payload: { values, id } };
});

export const addMemorialTypeRequest = createAction(MARKERS_AT.ADD_MEMORIAL_TYPE, (values: IMemorialTypeDto) => {
  return { payload: { values } };
});

export const editMemorialTypeRequest = createAction(MARKERS_AT.EDIT_MEMORIAL_TYPE, (values: IMemorialTypeDto, id: string) => {
  return { payload: { values, id } };
});

export const deleteMemorialTypeRequest = createAction(MARKERS_AT.DELETE_MEMORIAL_TYPE, (id: string) => {
  return { payload: { id } };
});
