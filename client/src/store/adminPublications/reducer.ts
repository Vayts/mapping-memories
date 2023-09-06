import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAdminPublication } from '@src/types/publication.types';
import { IAdminPublicationsState } from '@src/store/adminPublications/types';

const initialState: IAdminPublicationsState = {
  isLoading: true,
  data: [],
  isLoadingItems: [],
  searchValue: '',
};

export const adminPublicationsSlice = createSlice({
  name: 'adminPublications',
  initialState,
  reducers: {
    publicationsRequestEnd: (state) => {
      state.isLoading = false;
    },
    publicationsRequestStart: (state) => {
      state.isLoading = true;
    },
    setPublications: (state, action: PayloadAction<IAdminPublication[]>) => {
      state.data = action.payload;
    },
    setAdminPublicationsSearch: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const {
  publicationsRequestEnd,
  publicationsRequestStart,
  setPublications,
  setAdminPublicationsSearch,
} = adminPublicationsSlice.actions;
