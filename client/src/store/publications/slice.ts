import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { IPublicationState } from '@src/store/publications/types';
import { PUBLICATIONS_PAGE_CONFIG } from '@constants/publication';
import { IPublication } from '@src/types/publication.types';
import {
  createPublication,
  deletePublication, editPublication,
  getAllPublications, getAllPublicationsByTitle,
  getPublications,
  getPublicationsByTitle,
  loadMorePublications, removeFromFavorite, setFavorite,
} from '@src/store/publications/thunks';

const initialState: IPublicationState = {
  isLoading: false,
  loadMoreLoading: false,
  limit: PUBLICATIONS_PAGE_CONFIG.PER_PAGE,
  favoritePublications: [],
  hasMoreContent: true,
};

export const publicationsAdapter = createEntityAdapter<IPublication>({ selectId: (entity) => entity?._id });

export const publicationsSlice = createSlice({
  name: 'publications',
  initialState: publicationsAdapter.getInitialState(initialState),
  reducers: {
    addPublicationsLimit: (state) => {
      state.limit += PUBLICATIONS_PAGE_CONFIG.PER_PAGE;
    },
    resetPublicationsLimit: (state) => {
      state.limit = PUBLICATIONS_PAGE_CONFIG.PER_PAGE;
    },
    resetPublications: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicationsByTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicationsByTitle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getPublications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loadMorePublications.pending, (state) => {
        state.loadMoreLoading = true;
      })
      .addCase(loadMorePublications.rejected, (state) => {
        state.loadMoreLoading = false;
      })
      .addCase(getPublications.fulfilled, (state, { payload }) => {
        publicationsAdapter.setAll(state, payload.publications ?? {});
        state.hasMoreContent = payload.hasMoreContent;
        state.favoritePublications = payload.favoritePublications;
        state.isLoading = false;
      })
      .addCase(getAllPublications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPublications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllPublications.fulfilled, (state, { payload }) => {
        publicationsAdapter.setAll(state, payload.publications ?? {});
        state.isLoading = false;
      })
      .addCase(getAllPublicationsByTitle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPublicationsByTitle.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllPublicationsByTitle.fulfilled, (state, { payload }) => {
        publicationsAdapter.setAll(state, payload.publications ?? {});
      })
      .addCase(getPublicationsByTitle.fulfilled, (state, { payload }) => {
        publicationsAdapter.setAll(state, payload.publications ?? {});
        state.hasMoreContent = payload.hasMoreContent;
        state.favoritePublications = payload.favoritePublications;
        state.isLoading = false;
      })
      .addCase(deletePublication.fulfilled, (state, { payload }) => {
        publicationsAdapter.removeOne(state, payload);
      })
      .addCase(editPublication.fulfilled, (state, { payload }) => {
        publicationsAdapter.updateOne(state, { id: payload.id, changes: { ...payload.publication } });
      })
      .addCase(removeFromFavorite.fulfilled, (state, { payload }) => {
        publicationsAdapter.updateOne(state, { id: payload, changes: { isFavorite: false } });
      })
      .addCase(setFavorite.fulfilled, (state, { payload }) => {
        publicationsAdapter.updateOne(state, { id: payload, changes: { isFavorite: true } });
      })
      .addCase(createPublication.fulfilled, (state, { payload }) => {
        publicationsAdapter.upsertMany(state, payload.publications ?? {});
      })
      .addCase(loadMorePublications.fulfilled, (state, { payload }) => {
        publicationsAdapter.upsertMany(state, payload.publications ?? {});
        state.hasMoreContent = payload.hasMoreContent;
        state.loadMoreLoading = false;
      });
  },
});

export const { addPublicationsLimit, resetPublications, resetPublicationsLimit } = publicationsSlice.actions;
