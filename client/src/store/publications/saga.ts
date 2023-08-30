import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import {
  addPublications,
  addPublicationsLimit,
  publicationsRequestEnd,
  publicationsRequestStart,
  resetPublicationsLimit,
  setFavoritePublications,
  setInSearch,
  setPublicationsHasMoreContent,
  setPublications, setCurrentPublicationType,
} from '@src/store/publications/reducer';
import { PublicationType } from '@src/types/publication.types';
import { selectCurrentPublicationType, selectPublicationsLimit, selectPublicationsSearchValue } from '@src/store/publications/selectors';
import { getAllPublicationRequest, getFavoritePublicationsRequest, getPublicationsByTitle } from '@src/store/publications/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { appRequestEnd, appRequestStart } from '@src/store/app/reducer';

const { t } = i18n;

function* getAllPublicationSaga(): SagaIterator {
  try {
    const type = yield select(selectCurrentPublicationType);
    yield put(publicationsRequestStart());
    const limit = yield select(selectPublicationsLimit);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET}?limit=${limit}&type=${type}`);
    if (response.data) {
      yield put(addPublications(response.data.publication));
      yield put(setPublicationsHasMoreContent(response.data.hasMoreContent));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

function* getFavoritePublicationSaga(): SagaIterator {
  try {
    const type = yield select(selectCurrentPublicationType);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET_FAVORITE}?type=${type}`);
    if (response.data) {
      yield put(setFavoritePublications(response.data));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  }
}

function* getInterviewsByTitleSaga(): SagaIterator {
  try {
    yield put(publicationsRequestStart());
    yield put(resetPublicationsLimit());
    yield put(setInSearch(true));
    const limit = yield select(selectPublicationsLimit);
    const type = yield select(selectCurrentPublicationType);
    const search = yield select(selectPublicationsSearchValue);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET}?limit=${limit}&search=${search}&type=${type}`);
    if (response.data) {
      yield put(setPublications(response.data.publication));
      yield put(setPublicationsHasMoreContent(response.data.hasMoreContent));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

function* changePublicationTypeSaga(action: PayloadAction<'' | PublicationType>): SagaIterator {
  try {
    yield put(appRequestStart());
    yield call(getAllPublicationSaga);
    
    if (action.payload) {
      yield call(getFavoritePublicationSaga);
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(appRequestEnd());
  }
}

export function* watchAllPublications(): SagaIterator {
  yield takeLatest(getAllPublicationRequest, getAllPublicationSaga);
  yield takeLatest(addPublicationsLimit, getAllPublicationSaga);
  yield takeLatest(getFavoritePublicationsRequest, getFavoritePublicationSaga);
  yield takeLatest(getPublicationsByTitle, getInterviewsByTitleSaga);
  yield takeLatest(setCurrentPublicationType, changePublicationTypeSaga);
}
