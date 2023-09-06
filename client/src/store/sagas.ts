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

const sagas = [
  watchMap,
  watchCreatePublication,
  watchAllPublications,
  watchCurrentPublication,
  watchApp,
  watchLogin,
  watchPublications,
  watchEditPublication,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
