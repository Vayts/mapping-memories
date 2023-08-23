import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createInterviewRequestStart } from '@src/store/createInterview/reducer';
import { addInterviewRequest } from '@src/store/createInterview/actions';
import { PayloadAction } from '@reduxjs/toolkit';
import { postRequestWithFiles } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { getCreateInterviewFormData } from '@helpers/createInterview.helper';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';

const t = i18n.t;

function* addInterviewSaga(action: PayloadAction<any>): SagaIterator {
  const { values } = action.payload;
  const formData = getCreateInterviewFormData(values);
  try {
    yield put(createInterviewRequestStart);
    const response = yield call(postRequestWithFiles, ROUTES.INTERVIEW.ADD, formData);
    if (response) {
      getNotification(t('interviewAdded'), 'success');
    }
  } catch (e) {
    console.log(e);
    alert('error');
  }
}

export function* watchCreateInterview(): SagaIterator {
  yield takeLatest(addInterviewRequest, addInterviewSaga);
}
