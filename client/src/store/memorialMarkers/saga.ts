import { SagaIterator } from 'redux-saga';
import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { deleteRequest, getRequest, postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { IAdminMemorialMarker } from '@src/types/markers.types';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/user/sagas';
import {
  addMemorialMarkersRequest,
  deleteMemorialMarkerRequest, editMemorialMarkerRequest,
  getAllMemorialMarkersRequest, getCurrentMemorialRequest,
} from '@src/store/memorialMarkers/action';
import { getNotification } from '@src/notification/notifications';
import { PayloadAction } from '@reduxjs/toolkit';
import { getCreateMemorialFormData } from '@helpers/createMemorial.helper';
import { selectAdminMemorialMarkers, selectMemorialMarkersLoadingItems } from '@src/store/memorialMarkers/selectors';
import i18n from 'i18next';
import {
  adminMemorialMarkersRequestEnd,
  adminMemorialMarkersRequestStart,
  manageLoadingMemorialIds,
  setCurrentMemorial,
  setIsAddEditCompleted,
  setMemorialLoadingItem,
  setMemorialMarkers,
} from '@src/store/memorialMarkers/reducer';

const { t } = i18n;

function* getAllMemorialMarkersSaga(): SagaIterator {
  try {
    yield put(adminMemorialMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.MEMORIAL.GET_ALL}`, axiosPrivate);
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
    yield put(adminMemorialMarkersRequestEnd());
  }
}

function* addMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  
  try {
    const formData: FormData = getCreateMemorialFormData(values);
    yield put(adminMemorialMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.MEMORIAL.ADD, formData, axiosPrivate);
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
      yield call(tokenExpired, () => addMemorialMarkersRequest(values));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMemorialMarkersRequestEnd());
  }
}

function* deleteMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(manageLoadingMemorialIds(id));
    yield put(adminMemorialMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.MEMORIAL.DELETE}/${id}`, axiosPrivate);
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
    yield put(adminMemorialMarkersRequestEnd());
    yield put(manageLoadingMemorialIds(id));
  }
}

function* getCurrentMemorialSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(adminMemorialMarkersRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.MEMORIAL.GET}/${id}`, axiosPrivate);
    
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
      yield call(tokenExpired, () => getCurrentMemorialRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMemorialMarkersRequestEnd());
  }
}

function* editMemorialMarkerSaga(action: PayloadAction<any>): SagaIterator {
  const { values, id } = action.payload;
  try {
    const formData: FormData = getCreateMemorialFormData(values);
    yield put(manageLoadingMemorialIds(id));
    yield put(adminMemorialMarkersRequestStart());
    const markers = yield select(selectAdminMemorialMarkers);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.MEMORIAL.EDIT}/${id}`, formData, axiosPrivate);
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
    yield put(adminMemorialMarkersRequestEnd());
    yield put(manageLoadingMemorialIds(id));
  }
}

export function* watchMemorialMarkers(): SagaIterator {
  yield takeLatest(getAllMemorialMarkersRequest, getAllMemorialMarkersSaga);
  yield takeLatest(addMemorialMarkersRequest, addMemorialMarkerSaga);
  yield takeEvery(deleteMemorialMarkerRequest, deleteMemorialMarkerSaga);
  yield takeLatest(getCurrentMemorialRequest, getCurrentMemorialSaga);
  yield takeLatest(editMemorialMarkerRequest, editMemorialMarkerSaga);
}
