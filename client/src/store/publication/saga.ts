import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCurrentPublicationRequest } from '@src/store/publication/actions';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { currentPublicationRequestStart, setCurrentPublication } from '@src/store/publication/reducer';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';

const { t } = i18n;

function* getCurrentPublicationSaga(action: ReturnType<typeof getCurrentPublicationRequest>): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(currentPublicationRequestStart());
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET}/${id}`);
    yield put(setCurrentPublication(response.data));
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  }
}

export function* watchCurrentPublication(): SagaIterator {
  yield takeLatest(getCurrentPublicationRequest, getCurrentPublicationSaga);
}
