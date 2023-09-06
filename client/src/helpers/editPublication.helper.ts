import { IPublication } from '@src/types/publication.types';
import { ICreatePublicationContentBlock, ICreatePublicationMain } from '@src/types/createPublication.types';

export function convertPublicationDataToEditFormatMain(value: IPublication): ICreatePublicationMain {
  const mainInfo = {
    title: value.title,
    description: value.description,
    photo: value.photo,
    type: value.type,
    errors: {},
    touched: {},
  };
  
  return mainInfo;
}

export function covertPublicationDataToEditFormatContentBlocks(contentBlocks: IPublication['contentBlocks']): ICreatePublicationContentBlock[] {
  return contentBlocks.map((item: ICreatePublicationContentBlock) => {
    return {
      ...item,
      errors: {},
      touched: {},
    };
  });
}
