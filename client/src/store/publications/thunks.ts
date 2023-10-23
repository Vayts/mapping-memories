import { createAsyncThunk } from '@reduxjs/toolkit';
import { PUBLICATION_ROUTES } from '@constants/routes';
import { axiosPrivate, axiosPublic } from '@src/api/api';
import { IPublication, PublicationEnum } from '@src/types/publication.types';
import { RootState } from '@src/store';
import { publicationSchema } from '@src/store/publications/schema';
import { normalize } from 'normalizr';
import { addPublicationsLimit } from '@src/store/publications/slice';
import { ICreatePublicationDTO } from '@src/types/createPublication.types';
import { getCreatePublicationFormData } from '@helpers/createPublication.helper';

const MODULE_NAME = 'publications';

export const getPublications = createAsyncThunk(
  `${MODULE_NAME}/get`,
  async ({ type, search }: {type: PublicationEnum | '', search: string}, { getState, rejectWithValue }) => {
    try {
      const limit = (getState() as RootState).publications.limit;
      const response = await axiosPublic.get(`${PUBLICATION_ROUTES.GET}?limit=${limit}&search=${search}&type=${type}`);
      
      const result = normalize(response.data.publications, [publicationSchema]);
      return {
        publications: result.entities.publications,
        hasMoreContent: response.data.hasMoreContent,
        favoritePublications: response.data.favoritePublications,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getPublicationsByTitle = createAsyncThunk(
  `${MODULE_NAME}/getByTitle`,
  async ({ type, search }: {type: PublicationEnum | '', search: string}, { getState, rejectWithValue }) => {
    try {
      const limit = (getState() as RootState).publications.limit;
      const response = await axiosPublic.get(`${PUBLICATION_ROUTES.GET}?limit=${limit}&search=${search}&type=${type}`);
      const result = normalize(response.data.publications, [publicationSchema]);
      return {
        publications: result.entities.publications,
        hasMoreContent: response.data.hasMoreContent,
        favoritePublications: response.data.favoritePublications,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const loadMorePublications = createAsyncThunk(
  `${MODULE_NAME}/loadMore`,
  async ({ type, search }: {type: PublicationEnum | '', search: string}, { getState, rejectWithValue, dispatch }) => {
    try {
      await dispatch(addPublicationsLimit());
      const limit = (getState() as RootState).publications.limit;
      const response = await axiosPublic.get(`${PUBLICATION_ROUTES.LOAD_MORE}?limit=${limit}&search=${search}&type=${type}`);

      const result = normalize(response.data.publications, [publicationSchema]);
      return {
        publications: result.entities.publications,
        hasMoreContent: response.data.hasMoreContent,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const createPublication = createAsyncThunk(
  `${MODULE_NAME}/create`,
  async (values: ICreatePublicationDTO, { rejectWithValue }) => {
    const formData = getCreatePublicationFormData(values);
    try {
      const response = await axiosPrivate.post(PUBLICATION_ROUTES.ADD, formData);
      
      const result = normalize(response.data, [publicationSchema]);
      
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const editPublication = createAsyncThunk(
  `${MODULE_NAME}/edit`,
  async ({ values, id }: { values: ICreatePublicationDTO, id: string}, { rejectWithValue }) => {
    const formData = getCreatePublicationFormData(values);
    try {
      const response = await axiosPrivate.post(`${PUBLICATION_ROUTES.EDIT}/${id}`, formData);
      
      const result = normalize(response.data, publicationSchema);
      
      return {
        publication: result.entities.publications?.[result.result] as IPublication,
        id,
      };
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getAllPublications = createAsyncThunk(
  `${MODULE_NAME}/getAll`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<IPublication[]>(`${PUBLICATION_ROUTES.GET_ALL}?search=`);
      
      const indexedData = response.data.map((item, index) => {
        return { ...item, index: response.data.length - index };
      });
      const result = normalize(indexedData, [publicationSchema]);
      
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const getAllPublicationsByTitle = createAsyncThunk(
  `${MODULE_NAME}/getAllByTitle`,
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get<IPublication[]>(`${PUBLICATION_ROUTES.GET_ALL}?search=${search}`);
      
      const indexedData = response.data.map((item, index) => {
        return { ...item, index: index + 1 };
      });
      const result = normalize(indexedData, [publicationSchema]);
      
      return result.entities;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const deletePublication = createAsyncThunk(
  `${MODULE_NAME}/delete`,
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosPrivate.delete<IPublication[]>(`${PUBLICATION_ROUTES.DELETE}/${id}`);
      
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const removeFromFavorite = createAsyncThunk(
  `${MODULE_NAME}/removeFavorite`,
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosPrivate.put(`${PUBLICATION_ROUTES.REMOVE_FAVORITE}/${id}`);
      
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);

export const setFavorite = createAsyncThunk(
  `${MODULE_NAME}/setFavorite`,
  async (id: string, { rejectWithValue }) => {
    try {
      await axiosPrivate.put(`${PUBLICATION_ROUTES.SET_FAVORITE}/${id}`);
      
      return id;
    } catch (e: any) {
      return rejectWithValue(e?.response?.data?.message);
    }
  },
);
