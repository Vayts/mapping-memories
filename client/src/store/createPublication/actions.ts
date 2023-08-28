import { createAction } from '@reduxjs/toolkit';
import { ICreatePublicationDTO } from '@src/types/createPublicationTypes';
import { INTERVIEW } from '@constants/actions';

export const addPublicationRequest = createAction(INTERVIEW.ADD_INTERVIEW, (values: ICreatePublicationDTO) => ({ payload: { values } }));
