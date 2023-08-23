import { createAction } from '@reduxjs/toolkit';
import { ICreateInterviewDTO } from '@src/types/createInterviewTypes';
import { INTERVIEW } from '@constants/actions';

export const addInterviewRequest = createAction(INTERVIEW.ADD_INTERVIEW, (values: ICreateInterviewDTO) => ({ payload: { values } }));
