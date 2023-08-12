import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchMap } from '@src/store/map/saga';

const sagas = [
  watchMap,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
