import { ICreatePublicationMain, ICreatePublicationContentBlock, ICreatePublicationDTO } from '@src/types/createPublicationTypes';
import { getPhotoFullName } from '@helpers/photo.helper';

export function getCreatePublicationDTO(
  mainInfo: ICreatePublicationMain,
  contentBlocks: ICreatePublicationContentBlock[],
): ICreatePublicationDTO {
  const result: ICreatePublicationDTO = {
    photos: [mainInfo.photo as File],
    mainInfo: {
      title: mainInfo.title,
      description: mainInfo.description,
      photo: getPhotoFullName(mainInfo.photo as File),
    },
    contentBlocks: [],
  };
  
  contentBlocks.forEach((item) => {
    if (item.content?.photo) {
      result.photos.push(item.content.photo as File);
      result.contentBlocks.push({
        _id: item._id,
        type: item.type,
        content: {
          ...item.content,
          photo: getPhotoFullName(item.content.photo as File),
        },
      });
    } else {
      result.contentBlocks.push({
        _id: item._id,
        type: item.type,
        content: {
          ...item.content,
        },
      });
    }
  });
  
  return result;
}

export function getCreatePublicationFormData(values: ICreatePublicationDTO): FormData {
  const formData = new FormData();
  values.photos.forEach((item: File) => {
    formData.append('photos', item);
  });
  formData.append('mainInfo', JSON.stringify(values.mainInfo));
  formData.append('contentBlocks', JSON.stringify(values.contentBlocks));
  
  return formData;
}
