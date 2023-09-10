import { appFirstLoadAction } from '@src/store/app/action';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { userSaga } from '@src/store/user/sagas';
import { appRequestEnd } from '@src/store/app/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';

const { t } = i18n;

export function* appFirstLoadSaga(): SagaIterator {
  try {
    yield call(userSaga);
    yield put(appRequestEnd());
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  }
}
export function* watchApp(): SagaIterator {
  yield takeLatest(appFirstLoadAction, appFirstLoadSaga);
}
