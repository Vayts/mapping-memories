import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { watchMap } from '@src/store/map/saga';
import { watchCreateInterview } from '@src/store/createInterview/saga';
import { watchInterview } from '@src/store/interview/saga';

const sagas = [
  watchMap,
  watchCreateInterview,
  watchInterview,
];

export default function* rootSaga(): SagaIterator {
  yield all(sagas.map(fork));
}
