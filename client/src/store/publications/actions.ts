import { createAction } from '@reduxjs/toolkit';
import { PUBLICATION_AT } from '@constants/actions';

export const getAllPublicationRequest = createAction(PUBLICATION_AT.GET_ALL_PUBLICATION);

export const getFavoritePublicationsRequest = createAction(PUBLICATION_AT.GET_FAVORITE_PUBLICATION);

export const getPublicationsByTitle = createAction(PUBLICATION_AT.GET_PUBLICATION_BY_TITLE);
