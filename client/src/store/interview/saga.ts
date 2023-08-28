import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import {
  addInterviews,
  addInterviewsLimit,
  interviewsRequestEnd,
  interviewsRequestStart,
  resetInterviewsLimit,
  setFavoriteInterviews,
  setInSearch,
  setInterviewHasMoreContent,
  setInterviews,
} from '@src/store/interview/reducer';
import { selectInterviewsLimit, selectInterviewsSearchValue } from '@src/store/interview/selectors';
import { getAllInterviewRequest, getFavoriteInterviewsRequest, getInterviewsByTitle } from '@src/store/interview/actions';

const { t } = i18n;

function* getAllInterviewSaga(): SagaIterator {
  try {
    yield put(interviewsRequestStart());
    const limit = yield select(selectInterviewsLimit);
    const response = yield call(getRequest, `${ROUTES.INTERVIEW.GET}?limit=${limit}`);
    if (response.data) {
      yield put(addInterviews(response.data.interviews));
      yield put(setInterviewHasMoreContent(response.data.hasMoreInterviews));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'));
  } finally {
    yield put(interviewsRequestEnd());
  }
}

function* getFavoriteInterviewSaga(): SagaIterator {
  try {
    const response = yield call(getRequest, `${ROUTES.INTERVIEW.GET_FAVORITE}`);
    if (response.data) {
      yield put(setFavoriteInterviews(response.data));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'));
  }
}

function* getInterviewsByTitleSaga(): SagaIterator {
  try {
    yield put(interviewsRequestStart());
    yield put(resetInterviewsLimit());
    yield put(setInSearch(true));
    const limit = yield select(selectInterviewsLimit);
    const search = yield select(selectInterviewsSearchValue);
    const response = yield call(getRequest, `${ROUTES.INTERVIEW.GET}?limit=${limit}&search=${search}`);
    if (response.data) {
      yield put(setInterviews(response.data.interviews));
      yield put(setInterviewHasMoreContent(response.data.hasMoreInterviews));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'));
  } finally {
    yield put(interviewsRequestEnd());
  }
}

export function* watchAllInterview(): SagaIterator {
  yield takeLatest(getAllInterviewRequest, getAllInterviewSaga);
  yield takeLatest(addInterviewsLimit, getAllInterviewSaga);
  yield takeLatest(getFavoriteInterviewsRequest, getFavoriteInterviewSaga);
  yield takeLatest(getInterviewsByTitle, getInterviewsByTitleSaga);
}
