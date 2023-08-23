import { ICreateInterviewMain, ICreateInterviewContentBlock, ICreateInterviewDTO } from '@src/types/createInterviewTypes';
import { getPhotoFullName } from '@helpers/photo.helper';

export function getCreateInterviewDTO(mainInfo: ICreateInterviewMain, contentBlocks: ICreateInterviewContentBlock[]): ICreateInterviewDTO {
  const result: ICreateInterviewDTO = {
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

export function getCreateInterviewFormData(values: ICreateInterviewDTO): FormData {
  const formData = new FormData();
  values.photos.forEach((item: File) => {
    formData.append('photos', item);
  });
  formData.append('mainInfo', JSON.stringify(values.mainInfo));
  formData.append('contentBlocks', JSON.stringify(values.contentBlocks));
  
  return formData;
}
