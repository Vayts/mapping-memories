import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchMap } from '@src/store/map/saga';
import { watchCreatePublication } from '@src/store/createPublication/saga';
import { watchAllPublications } from '@src/store/publications/saga';
import { watchCurrentPublication } from '@src/store/publication/saga';

const sagas = [
  watchMap,
  watchCreatePublication,
  watchAllPublications,
  watchCurrentPublication,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
