import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { publicationsRequestEnd, publicationsRequestStart, setPublications } from '@src/store/adminPublications/reducer';
import { ROUTES } from '@constants/routes';
import { deleteRequest, getRequest } from '@src/api/request';
import { deletePublicationRequest, getAllPublicationBySearchRequest, getAllPublications } from '@src/store/adminPublications/action';
import { IAdminPublication, IPublication } from '@src/types/publication.types';
import { selectAdminPublications, selectAdminPublicationsSearch } from '@src/store/adminPublications/selectors';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';

const { t } = i18n;

function* getAllPublicationSaga(): SagaIterator {
  try {
    yield put(publicationsRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET_ALL}?search=`, axiosPrivate);
    if (response.data) {
      yield put(setPublications(response.data.map((item: IPublication, index: number) => {
        return {
          ...item,
          index,
        };
      })));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

function* deletePublicationSaga(action: { payload: { id: string; }; }): SagaIterator {
  const { id } = action.payload;
  
  try {
    yield put(publicationsRequestStart());
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(deleteRequest, `${ROUTES.PUBLICATION.DELETE}/${id}`, axiosPrivate);
    const publications = yield select(selectAdminPublications);
    if (response.data) {
      yield put(setPublications(publications.filter((item: IAdminPublication) => item._id !== id)));
      getNotification(t('itemDeleteMessage'));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

function* getAllPublicationBySearchSaga(): SagaIterator {
  try {
    yield put(publicationsRequestStart());
    const search = yield select(selectAdminPublicationsSearch);
    const user = yield select(selectUser);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.GET_ALL}?search=${search}`, axiosPrivate);
    if (response.data) {
      yield put(setPublications(response.data.map((item: IPublication, index: number) => {
        return {
          ...item,
          index,
        };
      })));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}
export function* watchPublications(): SagaIterator {
  yield takeLatest(getAllPublications, getAllPublicationSaga);
  yield takeLatest(getAllPublicationBySearchRequest, getAllPublicationBySearchSaga);
  yield takeEvery(deletePublicationRequest, deletePublicationSaga);
}
