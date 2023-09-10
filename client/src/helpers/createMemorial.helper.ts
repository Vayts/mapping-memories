import { IAddMemorialState, ICreateMemorialDto } from '@src/types/markers.types';
import { getFileFullName } from '@helpers/createPublication.helper';

export function getCreateMemorialDTO(values: IAddMemorialState): ICreateMemorialDto {
  return {
    photos: [values.photo as File],
    photo: values.photo ? typeof values.photo === 'string' ? values.photo : getFileFullName(values.photo) : '',
    photo_source: values.photo_source,
    title: values.title,
    description: values.description,
    lat: Number(values.lat),
    lng: Number(values.lng),
    city_id: values.city_id,
    icon: values.icon,
    link: values.link,
    type_id: values.type_id,
    address: values.address,
  };
}

export function getCreateMemorialFormData(values: ICreateMemorialDto): FormData {
  const formData = new FormData();
  values.photos.forEach((item: File) => {
    formData.append('photos', item);
  });
  
  Object.keys(values).forEach((item) => {
    if (item !== 'photos') {
      formData.append(item, JSON.stringify(values[item as keyof ICreateMemorialDto]));
    }
  });
  
  return formData;
}
