import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { publicationsRequestEnd, publicationsRequestStart, setLoadingItems, setPublications } from '@src/store/adminPublications/reducer';
import { ROUTES } from '@constants/routes';
import { deleteRequest, getRequest } from '@src/api/request';
import { deletePublicationRequest, getAllAdminPublicationByTitle, getAllAdminPublications } from '@src/store/adminPublications/action';
import { IAdminPublication, IPublication } from '@src/types/publication.types';
import { selectAdminPublications, selectAdminPublicationsSearch, selectLoadingPublication } from '@src/store/adminPublications/selectors';
import { selectUser } from '@src/store/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { removeFavoritePublicationRequest, setFavoritePublicationRequest } from '@src/store/publications/actions';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/user/sagas';

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
          index: index + 1,
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
  const loadingItems = yield select(selectLoadingPublication);
  
  try {
    yield put(setLoadingItems([...loadingItems, id]));
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
    yield put(setLoadingItems(loadingItems.filter((item: string) => item !== id)));
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
          index: index + 1,
        };
      })));
    }
  } catch (e) {
    getNotification(t('somethingWentWrong'), 'error');
  } finally {
    yield put(publicationsRequestEnd());
  }
}

function* setFavoritePublicationSaga(action: { payload: { id: string }; }): SagaIterator {
  const { id } = action.payload;
  const loadingItems = yield select(selectLoadingPublication);
  
  try {
    yield put(setLoadingItems([...loadingItems, id]));
    const user = yield select(selectUser);
    const publications = yield select(selectAdminPublications);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.SET_FAVORITE}/${id}`, axiosPrivate);
    if (response.data) {
      yield put(setPublications(publications.map((item: IAdminPublication) => {
        if (item._id === id) {
          return {
            ...item,
            isFavorite: true,
          };
        }
        
        return item;
      })));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => setFavoritePublicationRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(setLoadingItems(loadingItems.filter((item: string) => item !== id)));
  }
}

function* removeFavoritePublicationSaga(action: { payload: { id: string }; }): SagaIterator {
  const { id } = action.payload;
  const loadingItems = yield select(selectLoadingPublication);
  
  try {
    yield put(setLoadingItems([...loadingItems, id]));
    const user = yield select(selectUser);
    const publications = yield select(selectAdminPublications);
    const axiosPrivate = generateAxiosPrivate(user);
    const response = yield call(getRequest, `${ROUTES.PUBLICATION.REMOVE_FAVORITE}/${id}`, axiosPrivate);
    if (response.data) {
      yield put(setPublications(publications.map((item: IAdminPublication) => {
        if (item._id === id) {
          return {
            ...item,
            isFavorite: false,
          };
        }
        
        return item;
      })));
    }
  } catch (e: any) {
    if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
      yield call(tokenExpired, () => removeFavoritePublicationRequest(id));
    } else {
      getNotification(t('somethingWentWrong'), 'error');
    }
  } finally {
    yield put(setLoadingItems(loadingItems.filter((item: string) => item !== id)));
  }
}

export function* watchPublications(): SagaIterator {
  yield takeLatest(getAllAdminPublications, getAllPublicationSaga);
  yield takeLatest(getAllAdminPublicationByTitle, getAllPublicationBySearchSaga);
  yield takeEvery(deletePublicationRequest, deletePublicationSaga);
  yield takeEvery(setFavoritePublicationRequest, setFavoritePublicationSaga);
  yield takeEvery(removeFavoritePublicationRequest, removeFavoritePublicationSaga);
}
