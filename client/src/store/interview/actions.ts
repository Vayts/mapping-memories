import { createAction } from '@reduxjs/toolkit';
import { INTERVIEW } from '@constants/actions';

export const getAllInterviewRequest = createAction(INTERVIEW.GET_ALL_INTERVIEW);

export const getFavoriteInterviewsRequest = createAction(INTERVIEW.GET_FAVORITE_INTERVIEW);

export const getInterviewsByTitle = createAction(INTERVIEW.GET_INTERVIEWS_BY_TITLE);
