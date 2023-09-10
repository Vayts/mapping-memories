import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { mapSlice } from '@src/store/map/reducer';
import { appSlice } from '@src/store/app/reducer';
import rootSaga from '@src/store/sagas';
import { MARKERS_AT, PUBLICATION_AT } from '@constants/actions';
import { createPublicationSlice } from '@src/store/createPublication/reducer';
import { publicationsSlice } from '@src/store/publications/reducer';
import { currentPublicationSlice } from '@src/store/publication/reducer';
import { editPublicationSlice } from '@src/store/editPublication/reducer';
import { adminPublicationsSlice } from '@src/store/adminPublications/reducer';
import { userSlice } from '@src/store/user/reducer';
import { loginSlice } from '@src/store/login/reducer';
import { adminMarkersSlice } from '@src/store/adminMarkers/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    map: mapSlice.reducer,
    user: userSlice.reducer,
    login: loginSlice.reducer,
    publications: publicationsSlice.reducer,
    createPublication: createPublicationSlice.reducer,
    currentPublication: currentPublicationSlice.reducer,
    editPublication: editPublicationSlice.reducer,
    adminPublications: adminPublicationsSlice.reducer,
    adminMarkers: adminMarkersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        PUBLICATION_AT.ADD_PUBLICATION,
        PUBLICATION_AT.EDIT_PUBLICATION,
        MARKERS_AT.ADD_MEMORIAL_MARKER,
        MARKERS_AT.EDIT_MEMORIAL,
      ],
    },
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
