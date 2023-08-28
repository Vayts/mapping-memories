import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { mapSlice } from '@src/store/map/reducer';
import { appSlice } from '@src/store/app/reducer';
import rootSaga from '@src/store/sagas';
import { PUBLICATION } from '@constants/actions';
import { interviewsSlice } from '@src/store/interview/reducer';
import { createPublicationSlice } from '@src/store/createPublication/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    map: mapSlice.reducer,
    interviews: interviewsSlice.reducer,
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
