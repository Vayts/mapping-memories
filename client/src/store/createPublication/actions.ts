import { createAction } from '@reduxjs/toolkit';
import { ICreatePublicationDTO } from '@src/types/createPublication.types';
import { PUBLICATION_AT } from '@constants/actions';

export const addPublicationRequest = createAction(PUBLICATION_AT.ADD_PUBLICATION, (values: ICreatePublicationDTO) => {
  return { payload: { values } };
});
