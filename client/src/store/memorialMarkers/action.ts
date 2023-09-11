import { createAction } from '@reduxjs/toolkit';
import { MEMORIAL_AT } from '@constants/actions';
import { ICreateMemorialDto } from '@src/types/markers.types';

export const getAllMemorialMarkersRequest = createAction(MEMORIAL_AT.GET_ALL_MEMORIALS);

export const addMemorialMarkersRequest = createAction(MEMORIAL_AT.ADD_MEMORIAL_MARKER, (values: ICreateMemorialDto) => {
  return { payload: { values } };
});

export const deleteMemorialMarkerRequest = createAction(MEMORIAL_AT.DELETE_MEMORIAL_MARKER, (id: string) => {
  return { payload: { id } };
});

export const getCurrentMemorialRequest = createAction(MEMORIAL_AT.GET_CURRENT_MEMORIAL, (id: string) => {
  return { payload: { id } };
});

export const editMemorialMarkerRequest = createAction(MEMORIAL_AT.EDIT_MEMORIAL, (values: ICreateMemorialDto, id: string) => {
  return { payload: { values, id } };
});
