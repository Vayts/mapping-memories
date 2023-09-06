import { SagaIterator } from 'redux-saga';
import { put, takeLatest, call, select } from 'redux-saga/effects';
import { loginRequest } from '@src/store/login/actions';
import { loginRequestEnd, loginRequestStart } from '@src/store/login/reducer';
import { postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { setUser } from '@src/store/user/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { selectLoginData } from '@src/store/login/selector';

const { t } = i18n;

function* loginSaga(): SagaIterator {
  try {
    yield put(loginRequestStart());
    const data = yield select(selectLoginData);
    const response = yield call(postRequest, ROUTES.AUTH.LOGIN, data);
    if (response.data) {
      yield put(loginRequestEnd());
      yield put(setUser(response.data));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
    yield put(loginRequestEnd());
  }
}

export function* watchLogin(): SagaIterator {
  yield takeLatest(loginRequest, loginSaga);
}
