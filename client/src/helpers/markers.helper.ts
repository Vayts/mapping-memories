import { ICityMarkerDto, ICreateCityMarkerState } from '@src/types/markers.types';

export function getCityMarkerDTO(value: ICreateCityMarkerState): ICityMarkerDto {
  return {
    name: value.name,
    lat: Number(value.lat),
    lng: Number(value.lng),
  };
}

export function getCreateCityMarkerFormData(values: ICityMarkerDto): FormData {
  const formData = new FormData();
  formData.append('name', JSON.stringify(values.name));
  formData.append('lat', JSON.stringify(values.lat));
  formData.append('lng', JSON.stringify(values.lng));
  
  return formData;
}
