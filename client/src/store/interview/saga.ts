import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getAllInterviewRequest } from '@src/store/interview/actions';
import { interviewRequestEnd, interviewRequestStart, setFavoriteInterviews, setInterviews } from '@src/store/interview/reducer';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getNotification } from '@src/notification/notifications';

import i18n from 'i18next';
import { IInterview } from '@src/types/interview.types';

const { t } = i18n;

function* getAllInterviewSaga(): SagaIterator {
  try {
    yield put(interviewRequestStart);
    const response = yield call(getRequest, ROUTES.INTERVIEW.GET_ALL);
    yield put(setInterviews(response.data));
    
    const isFavoriteArr = response.data.filter((item: IInterview) => item.isFavorite);
    yield put(setFavoriteInterviews(isFavoriteArr.slice(0, 3)));
  } catch (e) {
    getNotification(t('somethingWentWrong'));
  } finally {
    yield put(interviewRequestEnd);
  }
}

export function* watchInterview(): SagaIterator {
  yield takeLatest(getAllInterviewRequest, getAllInterviewSaga);
}
