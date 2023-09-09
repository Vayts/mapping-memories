import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createPublicationRequestStart } from '@src/store/createPublication/reducer';
import { getRequest, postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { publicationsRequestEnd, setPublications } from '@src/store/adminPublications/reducer';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { selectUser } from '@src/store/user/selectors';
import { selectAdminPublications } from '@src/store/adminPublications/selectors';
import { editPublicationRequest, getPublicationForEditRequest } from '@src/store/editPublication/actions';
import {
  editPublicationRequestEnd,
  editPublicationRequestStart,
  setPublicationForEdit,
  setPublicationHasBeenEdited,
} from '@src/store/editPublication/reducer';
import { ICreatePublicationDTO } from '@src/types/createPublication.types';
import { IPublication } from '@src/types/publication.types';
import { getCreatePublicationFormData } from '@helpers/createPublication.helper';
import { tokenExpired } from '@src/store/user/sagas';
import { ERRORS } from '@constants/errors';

const t = i18n.t;

function* getPublicationForEditSaga(action: { payload: { id: string; }; }): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(editPublicationRequestStart());
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET}/${id}`);
    yield put(setPublicationForEdit(response.data));
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => getPublicationForEditRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(editPublicationRequestEnd());
  }
}

function* editPublicationSaga(action: { payload: { values: ICreatePublicationDTO; id: string }; }): SagaIterator {
  const { values, id } = action.payload;
  const formData = getCreatePublicationFormData(values);
  try {
    yield put(createPublicationRequestStart());
    const user = yield select(selectUser);
    const publications = yield select(selectAdminPublications);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, `${ROUTES.PUBLICATION.EDIT}/${id}`, formData, axiosPrivate);
    if (response.data) {
      getNotification(t('publicationHasBeenEdited'), 'success');
      const newPublications = publications.filter((item: IPublication) => item._id !== response.data._id);
      yield put(setPublications(newPublications));
      yield put(setPublicationHasBeenEdited(true));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => editPublicationRequest(values, id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(publicationsRequestEnd());
  }
}

export function* watchEditPublication(): SagaIterator {
  yield takeLatest(editPublicationRequest, editPublicationSaga);
  yield takeLatest(getPublicationForEditRequest, getPublicationForEditSaga);
}
