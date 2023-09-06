import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { createPublicationRequestStart, setPublicationHasBeenAdded } from '@src/store/createPublication/reducer';
import { addPublicationRequest } from '@src/store/createPublication/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { publicationsRequestEnd, setPublications } from '@src/store/adminPublications/reducer';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { selectUser } from '@src/store/user/selectors';
import { selectAdminPublications } from '@src/store/adminPublications/selectors';
import { getCreatePublicationFormData } from '@helpers/createPublication.helper';

const t = i18n.t;

function* addPublicationSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  const formData = getCreatePublicationFormData(values);
  try {
    yield put(createPublicationRequestStart());
    const user = yield select(selectUser);
    const publications = yield select(selectAdminPublications);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(postRequestWithFiles, ROUTES.PUBLICATION.ADD, formData, axiosPrivate);
    if (response.data) {
      getNotification(t('publicationAdded'), 'success');
      yield put(setPublications([...publications, ...response.data]));
      yield put(setPublicationHasBeenAdded(true));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

export function* watchCreatePublication(): SagaIterator {
  yield takeLatest(addPublicationRequest, addPublicationSaga);
}
