import { createAction } from '@reduxjs/toolkit';
import { PUBLICATION_AT } from '@constants/actions';

export const getCurrentPublicationRequest = createAction(PUBLICATION_AT.GET_CURRENT_PUBLICATION, (id) => ({
  payload: { id },
}));
