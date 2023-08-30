import { createAction } from '@reduxjs/toolkit';
import { PUBLICATION } from '@constants/actions';

export const getAllPublicationRequest = createAction(PUBLICATION.GET_ALL_PUBLICATION);

export const getFavoritePublicationsRequest = createAction(PUBLICATION.GET_FAVORITE_PUBLICATION);

export const getPublicationsByTitle = createAction(PUBLICATION.GET_PUBLICATION_BY_TITLE);
