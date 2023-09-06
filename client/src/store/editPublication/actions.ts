import { createAction } from '@reduxjs/toolkit';
import { ICreatePublicationDTO } from '@src/types/createPublication.types';
import { PUBLICATION_AT } from '@constants/actions';

export const editPublicationRequest = createAction(PUBLICATION_AT.EDIT_PUBLICATION, (values: ICreatePublicationDTO, id: string) => {
  return { payload: { values, id } };
});

export const getPublicationForEditRequest = createAction(PUBLICATION_AT.GET_CURRENT_PUBLICATION, (id: string) => {
  return { payload: { id } };
});
