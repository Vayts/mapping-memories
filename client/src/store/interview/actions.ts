import { createAction } from '@reduxjs/toolkit';
import { INTERVIEW } from '@constants/actions';

export const getAllInterviewRequest = createAction(INTERVIEW.GET_ALL_INTERVIEW);
