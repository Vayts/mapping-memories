import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { getMapInfoRequest } from '@src/store/map/actions';
import { mapRequestEnd, mapRequestStart, setActiveTypes, setMapInfo } from '@src/store/map/reducer';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { selectActiveTypes } from '@src/store/map/selectors';

function* getMapInfoSaga(): SagaIterator {
  try {
    yield put(mapRequestStart);
    const filters = yield select(selectActiveTypes);
    const response = yield call(getRequest, `${ROUTES.MAP.GET_INFO}?filters=${filters.join('_%_')}`);
    yield put(setMapInfo({
      memorials: response.data.memorials,
      cities: response.data.cities,
      types: response.data.types,
    }));
  } catch (e) {
    alert('error');
  } finally {
    yield put(mapRequestEnd);
  }
}

export function* watchMap(): SagaIterator {
  yield takeEvery(getMapInfoRequest, getMapInfoSaga);
  yield takeLatest(setActiveTypes, getMapInfoSaga);
}
