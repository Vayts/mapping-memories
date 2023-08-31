import { ICreatePublicationMain, ICreatePublicationContentBlock, ICreatePublicationDTO } from '@src/types/createPublication.types';
import { PublicationType } from '@src/types/publication.types';
import { v4 as uuidv4 } from 'uuid';

export function getFileFullName(file: File): string {
  const smallType = file.type.split('/').pop();
  return [file.name, smallType].join('.');
}

export function getCreatePublicationDTO(
  mainInfo: ICreatePublicationMain,
  contentBlocks: ICreatePublicationContentBlock[],
): ICreatePublicationDTO {
  const result: ICreatePublicationDTO = {
    files: [],
    photos: [mainInfo.photo as File],
    mainInfo: {
      type: mainInfo.type as PublicationType,
      title: mainInfo.title,
      description: mainInfo.description,
      photo: getFileFullName(mainInfo.photo as File),
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
          photo: getFileFullName(item.content.photo as File),
        },
      });
    } else if (item.content?.file) {
      const newFile = new File([item.content.file], `${uuidv4()}_${Date.now()}`, { type: item.content.file.type });
      result.files.push(newFile as File);
      result.contentBlocks.push({
        _id: item._id,
        type: item.type,
        content: {
          ...item.content,
          file: getFileFullName(newFile as File),
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
  values.files.forEach((item: File) => {
    formData.append('files', item);
  });
  formData.append('mainInfo', JSON.stringify(values.mainInfo));
  formData.append('contentBlocks', JSON.stringify(values.contentBlocks));
  
  return formData;
}
