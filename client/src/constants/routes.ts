export const ROUTES = {
  MAP: {
    GET_INFO: 'api/map/get-info',
  },
  MEMORIAL: {
    GET_ALL: 'api/memorial/get-all',
    ADD: 'api/memorial/add',
    GET: 'api/memorial/get',
    EDIT: 'api/memorial/edit',
    DELETE: 'api/memorial/delete',
  },
  CITY: {
    GET: 'api/city/get',
    ADD: 'api/city/add',
    EDIT: 'api/city/edit',
    DELETE: 'api/city/delete',
  },
  MEMORIAL_TYPE: {
    GET_ALL: 'api/memorial-type/get-all',
    ADD: 'api/memorial-type/add',
    EDIT: 'api/memorial-type/edit',
    DELETE: 'api/memorial-type/delete',
  },
  PUBLICATION: {
    ADD: 'api/publication/add',
    GET: 'api/publication/get',
    GET_ALL: 'api/publication/get-all',
    GET_FAVORITE: 'api/publication/get-favorite',
    GET_RECENT: 'api/publication/get-recent',
    DELETE: 'api/publication/delete',
    EDIT: 'api/publication/edit',
    SET_FAVORITE: 'api/publication/set-favorite',
    REMOVE_FAVORITE: 'api/publication/remove-favorite',
  },
  
};

export const MEMORIAL_ROUTES = {
  GET_ALL: '/memorial/get-all',
  ADD: '/memorial/add',
  GET: '/memorial/get',
  EDIT: '/memorial/edit',
  DELETE: '/memorial/delete',
};

export const CITY_ROUTES = {
  GET: '/city/get',
  ADD: '/city/add',
  EDIT: '/city/edit',
  DELETE: '/city/delete',
};

export const MEMORIAL_TYPE_ROUTES = {
  GET: '/memorial-type/get-all',
  ADD: '/memorial-type/add',
  EDIT: '/memorial-type/edit',
  DELETE: '/memorial-type/delete',
};

export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
};

export const MAP_ROUTES = {
  GET_INFO: '/map/get-info',
};

export const PUBLICATION_ROUTES = {
  ADD: '/publication/add',
  GET: '/publication/get',
  LOAD_MORE: '/publication/load-more',
  GET_ALL: '/publication/get-all',
  GET_FAVORITE: '/publication/get-favorite',
  GET_ADDITIONAL: '/publication/get-additional',
  DELETE: '/publication/delete',
  EDIT: '/publication/edit',
  SET_FAVORITE: '/publication/set-favorite',
  REMOVE_FAVORITE: '/publication/remove-favorite',
};
