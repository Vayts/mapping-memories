import { createAction } from '@reduxjs/toolkit';
import { MAP_AT } from '@constants/actions';

export const getMapInfoRequest = createAction(MAP_AT.GET_MAP_INFO);

export const mapFirstLoadRequest = createAction(MAP_AT.MAP_FIRST_LOAD);
