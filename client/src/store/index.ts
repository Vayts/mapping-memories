import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { mapSlice } from '@src/store/map/reducer';
import { appSlice } from '@src/store/app/reducer';
import rootSaga from '@src/store/sagas';
import { PUBLICATION } from '@constants/actions';
import { createPublicationSlice } from '@src/store/createPublication/reducer';
import { publicationsSlice } from '@src/store/publications/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    map: mapSlice.reducer,
    publications: publicationsSlice.reducer,
    createPublication: createPublicationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PUBLICATION.ADD_PUBLICATION],
    },
  }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
