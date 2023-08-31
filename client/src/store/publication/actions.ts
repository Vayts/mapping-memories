import { createAction } from '@reduxjs/toolkit';
import { PUBLICATION } from '@constants/actions';

export const getCurrentPublicationRequest = createAction(PUBLICATION.GET_CURRENT_PUBLICATION, (id) => ({
  payload: { id },
}));
