import { createAction } from '@reduxjs/toolkit';
import { MARKERS_AT } from '@constants/actions';
import { IMemorialTypeDto } from '@src/types/markers.types';

export const getAllMemorialTypesRequest = createAction(MARKERS_AT.GET_ALL_MEMORIAL_TYPES);

export const addMemorialTypeRequest = createAction(MARKERS_AT.ADD_MEMORIAL_TYPE, (values: IMemorialTypeDto) => {
  return { payload: { values } };
});

export const editMemorialTypeRequest = createAction(MARKERS_AT.EDIT_MEMORIAL_TYPE, (values: IMemorialTypeDto, id: string) => {
  return { payload: { values, id } };
});

export const deleteMemorialTypeRequest = createAction(MARKERS_AT.DELETE_MEMORIAL_TYPE, (id: string) => {
  return { payload: { id } };
});
