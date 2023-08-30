import { createAction } from '@reduxjs/toolkit';
import { ICreatePublicationDTO } from '@src/types/createPublicationTypes';
import { PUBLICATION } from '@constants/actions';

export const addPublicationRequest = createAction(PUBLICATION.ADD_PUBLICATION, (values: ICreatePublicationDTO) => {
  return { payload: { values } };
});
