import { createAction } from '@reduxjs/toolkit';
import { PUBLICATION_AT } from '@constants/actions';

export const getAllPublications = createAction(PUBLICATION_AT.GET_ALL_PUBLICATION);

export const getAllPublicationBySearchRequest = createAction(PUBLICATION_AT.GET_PUBLICATION_BY_TITLE);

export const deletePublicationRequest = createAction(PUBLICATION_AT.DELETE_PUBLICATION, (id) => ({ payload: { id } }));
