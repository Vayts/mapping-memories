import { ILocale } from '@src/types/locale.types';

export interface IMemorialMarker {
  _id: string,
  lat: number,
  lng: number,
  type_id: string,
  city_id: string,
  photo: string | null,
  photo_source: string | null,
  address: {
    en: string,
    uk: string,
  },
  description: {
    en: string,
    uk: string,
  },
  title: {
    en: string,
    uk: string,
  },
  link: string | null,
  icon: string,
}

export interface IAdminMemorialMarker extends IMemorialMarker {
  index: number,
  city: string,
}

export interface ICityMarker {
  _id: string,
  lat: number,
  lng: number,
  icon: string,
  city_id: string,
  count: number,
  name: {
    uk: string,
    en: string,
  }
}

export interface IAdminCityMarker extends ICityMarker{
  index: number,
}

export interface IMarkerType {
  _id: string,
  count: number,
  name: {
    uk: string,
    en: string,
  }
}

export interface IAdminMemorialType {
  index: number,
  _id: string,
  count: number,
  name: {
    uk: string,
    en: string,
  }
}

export interface ICreateMemorialTypeState {
  name: ILocale,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export interface ICreateCityMarkerState {
  name: ILocale,
  lat: string,
  lng: string,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export interface IAddMemorialState {
  title: ILocale,
  description: ILocale,
  address: ILocale,
  icon: string,
  lat: string,
  lng: string,
  city_id: string,
  type_id: string,
  photo: null | File | string,
  link: string,
  photo_source: string,
  errors: Record<string, any>,
  touched: Record<string, any>,
}

export interface ICreateMemorialDto {
  photos: File[],
  title: ILocale,
  description: ILocale,
  address: ILocale,
  icon: string,
  lat: number,
  lng: number,
  city_id: string,
  type_id: string,
  photo: string,
  link: string,
  photo_source: string,
}

export interface ICityMarkerDto {
  name: ILocale,
  lat: number,
  lng: number,
}

export interface IMemorialTypeDto {
  name: ILocale,
}
