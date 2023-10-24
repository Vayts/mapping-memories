import { configureStore } from '@reduxjs/toolkit';
import { MEMORIAL_AT, PUBLICATION_AT } from '@constants/actions';
import { authSlice } from '@src/store/auth/slice';
import { publicationsSlice } from '@src/store/publications/slice';
import { coreSlice } from '@src/store/core/slice';
import { currentPublicationSlice } from '@src/store/currentPublication/slice';
import { memorialsSlice } from '@src/store/memorials/slice';
import { citiesSlice } from '@src/store/cities/slice';
import { memorialTypesSlice } from '@src/store/memorialTypes/slice';
import { mapSlice } from '@src/store/map/slice';

export const store = configureStore({
  reducer: {
    [mapSlice.name]: mapSlice.reducer,
    [memorialsSlice.name]: memorialsSlice.reducer,
    [citiesSlice.name]: citiesSlice.reducer,
    [coreSlice.name]: coreSlice.reducer,
    [currentPublicationSlice.name]: currentPublicationSlice.reducer,
    [publicationsSlice.name]: publicationsSlice.reducer,
    [memorialTypesSlice.name]: memorialTypesSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        PUBLICATION_AT.ADD_PUBLICATION,
        PUBLICATION_AT.EDIT_PUBLICATION,
        MEMORIAL_AT.ADD_MEMORIAL_MARKER,
        MEMORIAL_AT.EDIT_MEMORIAL,
      ],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
