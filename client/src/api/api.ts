import { store } from '@src/store';
import axios from 'axios';
import { refresh } from '@src/store/auth/thunks';
import { AUTH_ERRORS } from '@constants/errors';

export const BASE_URI = 'https://mapping-memories.onrender.com';
export const BASE_URL = `${BASE_URI}/api`;

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const user = store.getState().auth.user;
    if (user) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.data?.message === AUTH_ERRORS.NOT_AUTHORIZED && !prevRequest?.sent) {
      prevRequest.sent = true;
      await store.dispatch(refresh());
      return axiosPrivate(prevRequest, { withCredentials: true });
    }
    return Promise.reject(error);
  },
);
