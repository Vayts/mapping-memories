import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { SagaIterator } from 'redux-saga';
import { axiosPrivate } from '@src/api/axios';
import { logoutRequest, tokenExpiredErrorRequest } from '@src/store/user/action';
import { getNotification } from '@src/notification/notifications';
import i18next from 'i18next';
import { selectUser } from '@src/store/user/selectors';
import { setUser, refreshRequest, refreshRequestError, refreshRequestSuccess } from '@src/store/user/reducer';

const { t } = i18next;

export function* userSaga(): SagaIterator {
  try {
    const response = yield call(getRequest, ROUTES.AUTH.REFRESH, axiosPrivate);
    yield put(setUser(response.data));
    yield put(refreshRequestSuccess());
  } catch (e) {
    yield put(refreshRequestError());
  }
}

export function* logoutSaga(): SagaIterator {
  try {
    yield call(getRequest, ROUTES.AUTH.LOGOUT);
    yield put(setUser(null));
  } catch (e) {
    getNotification(t('somethingWentWrong', 'error'));
  }
}

export function* tokenExpired(action: () => any): SagaIterator {
  yield call(userSaga);
  const user = yield select(selectUser);
  if (user.token) {
    yield put(action());
  }
}

export function* watchUser(): SagaIterator {
  yield takeLatest(refreshRequest, userSaga);
  yield takeLatest(tokenExpiredErrorRequest, userSaga);
  yield takeLatest(logoutRequest, logoutSaga);
}
