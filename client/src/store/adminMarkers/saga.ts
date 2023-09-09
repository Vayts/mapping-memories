import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import {
  addCityMarkerRequest, addMemorialMarkersRequest,
  deleteCityMarkerRequest, deleteMemorialMarkerRequest,
  editCityMarkerRequest, editMemorialMarkerRequest, getAllMemorialMarkersRequest, getAllMemorialTypesRequest,
  getCityMarkersRequest, getCurrentMemorialRequest,
} from '@src/store/adminMarkers/action';
import {
  adminMarkersRequestEnd,
  adminMarkersRequestStart,
  setCityMarkers, setCurrentMemorial, setIsAddEditCompleted,
  setMemorialMarkers,
  setMemorialTypes,
} from '@src/store/adminMarkers/reducer';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { deleteRequest, getRequest, postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { IAdminCityMarker, IAdminMemorialMarker, IAdminMemorialType, ICityMarker } from '@src/types/markers.types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/user/sagas';
import { getCreateCityMarkerFormData } from '@helpers/markers.helper';
import { selectAdminCityMarkers, selectAdminMemorialMarkers } from '@src/store/adminMarkers/selectors';
import { getCreateMemorialFormData } from '@helpers/createMemorial.helper';

const { t } = i18n;

function* cityMarkersRequestSaga(): SagaIterator {
  try {
    yield put(adminMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, ROUTES.MAP.GET_CITY_MARKERS, axiosPrivate);
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
    yield put(adminMarkersRequestEnd());
  }
}

function* addCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  
  try {
    const formData: FormData = getCreateCityMarkerFormData(values);
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.MAP.ADD_CITY_MARKER, formData, axiosPrivate);
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
    yield put(adminMarkersRequestEnd());
  }
}

function* editCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values, id } = action.payload;
  
  try {
    const formData: FormData = getCreateCityMarkerFormData(values);
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.MAP.EDIT_CITY_MARKER}/${id}`, formData, axiosPrivate);
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
    yield put(adminMarkersRequestEnd());
  }
}

function* deleteCityMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminCityMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.MAP.DELETE_CITY_MARKER}/${id}`, axiosPrivate);
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
    yield put(adminMarkersRequestEnd());
  }
}

function* getAllMemorialMarkersSaga(): SagaIterator {
  try {
    yield put(adminMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.MAP.GET_ALL_MEMORIALS}`, axiosPrivate);
    if (response.data) {
      yield put(setMemorialMarkers(response.data.map((item: IAdminMemorialMarker, index: number) => {
        return {
          ...item,
          index: index + 1,
        };
      })));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => getAllMemorialMarkersRequest());
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* getAllMemorialTypesSaga(): SagaIterator {
  try {
    yield put(adminMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.MAP.GET_ALL_MEMORIAL_TYPES}`, axiosPrivate);
    if (response.data) {
      yield put(setMemorialTypes(response.data.map((item: IAdminMemorialType, index: number) => {
        return {
          ...item,
          index: index + 1,
        };
      })));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => getAllMemorialTypesRequest());
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* addMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  
  try {
    const formData: FormData = getCreateMemorialFormData(values);
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.MAP.ADD_MEMORIAL_MARKER, formData, axiosPrivate);
    if (response.data[0]) {
      yield put(setMemorialMarkers([...markers, {
        ...response.data[0],
        index: markers.length + 1,
      }]));
      yield put(setIsAddEditCompleted(true));
      getNotification(t('addMemorialSuccessText'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => addCityMarkerRequest(values));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* deleteMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.MAP.DELETE_MEMORIAL_MARKER}/${id}`, axiosPrivate);
    if (response.data) {
      yield put(setMemorialMarkers(markers.filter((item: IAdminMemorialMarker) => item._id !== id)));
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => deleteMemorialMarkerRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* getCurrentMemorialSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(adminMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.MAP.GET_MEMORIAL}/${id}`, axiosPrivate);

    if (response.data) {
      const obj = { ...response.data };
      Object.keys(obj).forEach((key) => {
        if (obj[key] === null) {
          obj[key] = '';
        }
      });
      
      yield put(setCurrentMemorial(obj));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => getAllMemorialTypesRequest());
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* editMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values, id } = action.payload;
  
  try {
    const formData: FormData = getCreateMemorialFormData(values);
    yield put(adminMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.MAP.EDIT_MEMORIAL}/${id}`, formData, axiosPrivate);
    if (response.data) {
      yield put(setMemorialMarkers((markers.map((item: IAdminMemorialMarker) => {
        if (item._id === id) {
          return {
            ...item,
            ...response.data,
          };
        }
        
        return item;
      }))));
      
      yield put(setIsAddEditCompleted(true));
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => editMemorialMarkerRequest(values, id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

export function* watchMarkers(): SagaIterator {
  yield takeLatest(addCityMarkerRequest, addCityMarkerSaga);
  yield takeEvery(editCityMarkerRequest, editCityMarkerSaga);
  yield takeLatest(getCityMarkersRequest, cityMarkersRequestSaga);
  yield takeEvery(deleteCityMarkerRequest, deleteCityMarkerSaga);
  yield takeLatest(getAllMemorialMarkersRequest, getAllMemorialMarkersSaga);
  yield takeLatest(getAllMemorialTypesRequest, getAllMemorialTypesSaga);
  yield takeLatest(addMemorialMarkersRequest, addMemorialMarkerSaga);
  yield takeEvery(deleteMemorialMarkerRequest, deleteMemorialMarkerSaga);
  yield takeLatest(getCurrentMemorialRequest, getCurrentMemorialSaga);
  yield takeLatest(editMemorialMarkerRequest, editMemorialMarkerSaga);
}
