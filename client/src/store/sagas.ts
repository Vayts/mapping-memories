import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchMap } from '@src/store/map/saga';
import { watchAllInterview } from '@src/store/interview/saga';
import { watchCreatePublication } from '@src/store/createPublication/saga';

const sagas = [
  watchMap,
  watchCreatePublication,
  watchAllInterview,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
