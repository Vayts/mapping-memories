import { createAction } from '@reduxjs/toolkit';

export const tokenExpiredErrorRequest = createAction('TOKEN_EXPIRED');
export const logoutRequest = createAction('LOGOUT');
