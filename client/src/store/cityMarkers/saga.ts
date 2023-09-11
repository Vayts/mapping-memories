import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import {
  addCityMarkerRequest,
  deleteCityMarkerRequest,
  editCityMarkerRequest,
  getCityMarkersRequest,
} from '@src/store/cityMarkers/action';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { deleteRequest, getRequest, postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { IAdminCityMarker, ICityMarker } from '@src/types/markers.types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/user/sagas';
import { getCreateCityMarkerFormData } from '@helpers/markers.helper';
import { selectAdminCityMarkers } from '@src/store/cityMarkers/selectors';
import { cityMarkersRequestEnd, cityMarkersRequestStart, setCityMarkers } from '@src/store/cityMarkers/reducer';

const { t } = i18n;

function* cityMarkersRequestSaga(): SagaIterator {
  try {
    yield put(cityMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, ROUTES.CITY.GET, axiosPrivate);
    if (response.data) {
      yield put(setCityMarkers(response.data.map((item: ICityMarker, index: number) => {
        return {
          ...item,
          index: index + 1,
        };
      })));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => getCityMarkersRequest());
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(cityMarkersRequestEnd());
  }
}

function* addCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  
  try {
    const formData: FormData = getCreateCityMarkerFormData(values);
    yield put(cityMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.CITY.ADD, formData, axiosPrivate);
    if (response.data[0]) {
      yield put(setCityMarkers([...markers, {
        ...response.data[0],
        index: markers.length + 1,
        count: 0,
      }]));
      
      getNotification(t('addCityMarkerSuccessText'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => addCityMarkerRequest(values));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(cityMarkersRequestEnd());
  }
}

function* editCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values, id } = action.payload;
  
  try {
    const formData: FormData = getCreateCityMarkerFormData(values);
    yield put(cityMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.CITY.EDIT}/${id}`, formData, axiosPrivate);
    if (response.data) {
      yield put(setCityMarkers(markers.map((item: IAdminCityMarker) => {
        if (item._id === id) {
          return {
            ...item,
            ...response.data,
          };
        }
        
        return item;
      })));
      
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => editCityMarkerRequest(values, id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(cityMarkersRequestEnd());
  }
}

function* deleteCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(cityMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.CITY.DELETE}/${id}`, axiosPrivate);
    if (response.data) {
      yield put(setCityMarkers(markers.filter((item: IAdminCityMarker) => item._id !== id)));
      
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => deleteCityMarkerRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(cityMarkersRequestEnd());
  }
}

export function* watchCityMarkers(): SagaIterator {
  yield takeLatest(addCityMarkerRequest, addCityMarkerSaga);
  yield takeEvery(editCityMarkerRequest, editCityMarkerSaga);
  yield takeLatest(getCityMarkersRequest, cityMarkersRequestSaga);
  yield takeEvery(deleteCityMarkerRequest, deleteCityMarkerSaga);
}
