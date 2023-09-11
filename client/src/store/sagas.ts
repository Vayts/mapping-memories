import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchMap } from '@src/store/map/saga';
import { watchCreatePublication } from '@src/store/createPublication/saga';
import { watchAllPublications } from '@src/store/publications/saga';
import { watchCurrentPublication } from '@src/store/publication/saga';
import { watchEditPublication } from '@src/store/editPublication/saga';
import { watchPublications } from '@src/store/adminPublications/saga';
import { watchApp } from '@src/store/app/saga';
import { watchLogin } from '@src/store/login/sagas';
import { watchMarkers } from '@src/store/adminMarkers/saga';
import { watchCityMarkers } from '@src/store/cityMarkers/saga';
import { watchMemorialMarkers } from '@src/store/memorialMarkers/saga';

const sagas = [
  watchMap,
  watchCreatePublication,
  watchAllPublications,
  watchCurrentPublication,
  watchApp,
  watchLogin,
  watchPublications,
  watchEditPublication,
  watchMarkers,
  watchCityMarkers,
  watchMemorialMarkers,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
