import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { getMapInfoRequest, mapFirstLoadRequest } from '@src/store/map/actions';
import { mapRequestEnd, mapRequestStart, setActiveTypes, setMapInfo } from '@src/store/map/reducer';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { selectActiveTypes } from '@src/store/map/selectors';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { appRequestEnd, appRequestStart } from '@src/store/app/reducer';

const { t } = i18n;

function* getMapInfoSaga(): SagaIterator {
  try {
    yield put(mapRequestStart());
    const filters = yield select(selectActiveTypes);
    const response = yield call(getRequest, `${ROUTES.MAP.GET_INFO}?filters=${filters.join('_%_')}`);
    yield put(setMapInfo({
      memorials: response.data.memorials,
      cities: response.data.cities,
      types: response.data.types,
    }));
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(mapRequestEnd());
  }
}

function* mapFirstLoad(): SagaIterator {
  try {
    yield put(appRequestStart());
    yield call(getMapInfoSaga);
  } finally {
    yield put(appRequestEnd());
  }
}

export function* watchMap(): SagaIterator {
  yield takeEvery(getMapInfoRequest, getMapInfoSaga);
  yield takeLatest(mapFirstLoadRequest, mapFirstLoad);
  yield takeLatest(setActiveTypes, getMapInfoSaga);
}
