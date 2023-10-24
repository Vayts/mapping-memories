import { ICityMarkerDto, ICreateCityMarkerState, ICreateMemorialTypeState, IMemorialTypeDto } from '@src/types/markers.types';

export function getCityMarkerDTO(value: ICreateCityMarkerState): ICityMarkerDto {
  return {
    name: value.name,
    lat: Number(value.lat),
    lng: Number(value.lng),
  };
}

export function getMemorialTypeDTO(value: ICreateMemorialTypeState): IMemorialTypeDto {
  return {
    name: value.name,
  };
}

export function getMemorialTypeFormData(values: ICityMarkerDto): FormData {
  const formData = new FormData();
  formData.append('name', JSON.stringify(values.name));
  
  return formData;
}
