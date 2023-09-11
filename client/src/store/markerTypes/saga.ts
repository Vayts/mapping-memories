import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import {
  addMemorialTypeRequest,
  deleteMemorialTypeRequest,
  editMemorialTypeRequest,
  getAllMemorialTypesRequest,
} from '@src/store/adminMarkers/action';
import {
  adminMarkersRequestEnd,
  adminMarkersRequestStart,
  setMemorialTypes,
} from '@src/store/adminMarkers/reducer';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { deleteRequest, getRequest, postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { IAdminMemorialType } from '@src/types/markers.types';
import { PayloadAction } from '@reduxjs/toolkit';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/user/sagas';
import { getMemorialTypeFormData } from '@helpers/markers.helper';
import { selectAdminMemorialTypes } from '@src/store/adminMarkers/selectors';

const { t } = i18n;

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

function* addMemorialTypeSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  
  try {
    const formData: FormData = getMemorialTypeFormData(values);
    yield put(adminMarkersRequestStart());
    const types = yield select(selectAdminMemorialTypes);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.MAP.ADD_MEMORIAL_TYPE, formData, axiosPrivate);
    if (response.data[0]) {
      yield put(setMemorialTypes([...types, {
        ...response.data[0],
        index: types.length + 1,
        count: 0,
      }]));
      getNotification(t('addMemorialTypeSuccessText'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => addMemorialTypeRequest(values));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* editMemorialTypeSaga(action: PayloadAction<any>): SagaIterator {
  const { values, id } = action.payload;
  
  try {
    const formData: FormData = getMemorialTypeFormData(values);
    yield put(adminMarkersRequestStart());
    const types = yield select(selectAdminMemorialTypes);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.MAP.EDIT_MEMORIAL_TYPE}/${id}`, formData, axiosPrivate);
    if (response.data) {
      yield put(setMemorialTypes(types.map((item: IAdminMemorialType) => {
        if (item._id === id) {
          return {
            ...item,
            name: response.data.name,
          };
        }
        return item;
      })));
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => editMemorialTypeRequest(values, id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

function* deleteMemorialTypeSaga(action: PayloadAction<any>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(adminMarkersRequestStart());
    const types = yield select(selectAdminMemorialTypes);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.MAP.DELETE_MEMORIAL_TYPE}/${id}`, axiosPrivate);
    if (response.data) {
      yield put(setMemorialTypes(types.filter((item: IAdminMemorialType) => item._id !== id)));
      getNotification(t('successful'));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => deleteMemorialTypeRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(adminMarkersRequestEnd());
  }
}

export function* watchMarkers(): SagaIterator {
  yield takeLatest(getAllMemorialTypesRequest, getAllMemorialTypesSaga);
  yield takeLatest(addMemorialTypeRequest, addMemorialTypeSaga);
  yield takeLatest(editMemorialTypeRequest, editMemorialTypeSaga);
  yield takeEvery(deleteMemorialTypeRequest, deleteMemorialTypeSaga);
}
