import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPublicationState } from '@src/store/publications/types';
import { IPublication, PublicationType } from '@src/types/publication.types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';

const initialState: IPublicationState = {
  currentPublicationType: '',
  isInSearch: false,
  searchValue: '',
  isLoading: true,
  data: [],
  favoritePublication: [],
  limit: PUBLICATIONS_PAGE_CONFIG.PER_PAGE,
  hasMoreContent: false,
};

export const publicationsSlice = createSlice({
  name: 'publicationsSlice',
  initialState,
  reducers: {
    publicationsRequestStart: (state) => {
      state.isLoading = true;
    },
    publicationsRequestEnd: (state) => {
      state.isLoading = false;
    },
    setPublicationsSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetPublicationsLimit: (state) => {
      state.limit = initialState.limit;
    },
    resetPublications: (state) => {
      state.data = initialState.data;
      state.favoritePublication = initialState.favoritePublication;
    },
    setFavoritePublications: (state, action: PayloadAction<IPublication[]>) => {
      state.favoritePublication = [...action.payload];
    },
    addPublicationsLimit: (state) => {
      state.limit += PUBLICATIONS_PAGE_CONFIG.PER_PAGE;
    },
    addPublications: (state, action: PayloadAction<IPublication[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    setPublications: (state, action: PayloadAction<IPublication[]>) => {
      state.data = [...action.payload];
    },
    setInSearch: (state, action: PayloadAction<boolean>) => {
      state.isInSearch = action.payload;
    },
    setPublicationsHasMoreContent: (state, action: PayloadAction<boolean>) => {
      state.hasMoreContent = action.payload;
    },
    setCurrentPublicationType: (state, action: PayloadAction<'' | PublicationType>) => {
      state.currentPublicationType = action.payload;
    },
    resetPublicationsState: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  addPublications,
  publicationsRequestEnd,
  resetPublicationsLimit,
  setPublicationsSearchValue,
  publicationsRequestStart,
  setInSearch,
  setPublicationsHasMoreContent,
  setPublications,
  setFavoritePublications,
  addPublicationsLimit,
  resetPublications,
  setCurrentPublicationType,
  resetPublicationsState,
} = publicationsSlice.actions;
