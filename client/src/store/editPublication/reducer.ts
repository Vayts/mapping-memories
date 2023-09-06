import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEditPublicationState } from '@src/store/editPublication/types';
import { IPublication } from '@src/types/publication.types';

const initialState: IEditPublicationState = {
  publication: null,
  isLoading: false,
  hasBeenEdited: false,
};

export const editPublicationSlice = createSlice({
  name: 'editPublication',
  initialState,
  reducers: {
    editPublicationRequestStart: (state) => {
      state.isLoading = true;
    },
    editPublicationRequestEnd: (state) => {
      state.isLoading = false;
    },
    setPublicationHasBeenEdited: (state, action: PayloadAction<boolean>) => {
      state.hasBeenEdited = action.payload;
    },
    setPublicationForEdit: (state, action: PayloadAction<IPublication>) => {
      state.publication = action.payload;
    },
  },
});

export const {
  editPublicationRequestStart,
  setPublicationHasBeenEdited,
  editPublicationRequestEnd,
  setPublicationForEdit,
} = editPublicationSlice.actions;
