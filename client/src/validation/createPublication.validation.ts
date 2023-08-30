import i18n from 'i18next';
import { PUBLICATION_TYPES, PUBLICATION_VALIDATION } from '@constants/createPublication';
import {
  ICreatePublicationMain,
  ICreatePublicationContentBlock,
  IPhotoContentBlock,
  ITextContentBlock,
  IVideoContentBlock, IPdfContentBlock,
} from '@src/types/createPublicationTypes';
import { PUBLICATION_BLOCK_TYPES } from '@constants/publicationContentBlocks';
import { getNotification } from '@src/notification/notifications';
import { LINK_REGEX, YOUTUBE_EMBED_REGEX } from '@constants/regex';
import { LocaleType } from '@src/types/types';

const { t } = i18n;

function validatePublicationTitle(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }

  if (str.length < PUBLICATION_VALIDATION.LIMIT.TITLE_MIN) {
    errors[locale] = t('atLeast', { value: PUBLICATION_VALIDATION.LIMIT.TITLE_MIN });
    return errors;
  }
  
  if (str.length > PUBLICATION_VALIDATION.LIMIT.TITLE_MAX) {
    errors[locale] = t('lessThan', { value: PUBLICATION_VALIDATION.LIMIT.TITLE_MAX });
    return errors;
  }
  
  return errors;
}

function validatePublicationDescription(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < PUBLICATION_VALIDATION.LIMIT.DESCRIPTION_MIN) {
    errors[locale] = t('atLeast', { value: PUBLICATION_VALIDATION.LIMIT.DESCRIPTION_MIN });
    return errors;
  }
  
  if (str.length > PUBLICATION_VALIDATION.LIMIT.DESCRIPTION_MAX) {
    errors[locale] = t('lessThan', { value: PUBLICATION_VALIDATION.LIMIT.DESCRIPTION_MAX });
    return errors;
  }
  
  return errors;
}

function validateRequiredPhoto(photo: File | null): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!photo) {
    errors.photo = t('requiredField');
    return errors;
  }
  return errors;
}

function validateMainInfoType(type: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!type) {
    errors.type = t('requiredField');
    return errors;
  }
  
  if (!PUBLICATION_TYPES.includes(type)) {
    errors.type = t('wrongPublicationType');
    return errors;
  }
  
  return errors;
}

export function getPublicationMainValidation(mainInfo: ICreatePublicationMain): Record<string, Record<string, string> | string> {
  const titleUk = validatePublicationTitle(mainInfo.title.uk, 'uk');
  const titleEn = validatePublicationTitle(mainInfo.title.en, 'en');
  const descriptionUk = validatePublicationDescription(mainInfo.description.uk, 'uk');
  const descriptionEn = validatePublicationDescription(mainInfo.description.en, 'en');
  const type = validateMainInfoType(mainInfo.type);
  const photo = validateRequiredPhoto(mainInfo.photo);
  
  const result: Record<string, Record<string, string> | string> = {};
  
  if (Object.values(titleUk).length > 0 || Object.values(titleEn).length > 0) {
    result.title = {
      ...titleUk,
      ...titleEn,
    };
  }
  
  if (Object.values(descriptionUk).length > 0 || Object.values(descriptionEn).length > 0) {
    result.description = {
      ...descriptionUk,
      ...descriptionEn,
    };
  }
  
  return {
    ...result,
    ...photo,
    ...type,
  };
}

function validatePublicationVideoLink(link: string) {
  const errors: Record<string, string> = {};
  
  if (!link) {
    errors.link = t('requiredField');
    return errors;
  }
  
  if (!YOUTUBE_EMBED_REGEX.test(link)) {
    errors.link = t('incorrectLink');
    return errors;
  }
  
  return errors;
}

export function getPublicationVideoBlockValidation(content: IVideoContentBlock['content']): Record<string, Record<string, string> | string> {
  const linkValidate = validatePublicationVideoLink(content.link);
  
  return {
    ...linkValidate,
  };
}

function validatePublicationPhotoSourceLink(link: string) {
  const errors: Record<string, string> = {};
  
  if (link !== '') {
    if (!LINK_REGEX.test(link)) {
      errors.source = t('incorrectLink');
      return errors;
    }
  }
  
  return errors;
}

function getPublicationPhotoBlockValidation(content: IPhotoContentBlock['content']): Record<string, Record<string, string> | string> {
  const linkValidate = validatePublicationPhotoSourceLink(content.source);
  const photoValidate = validateRequiredPhoto(content.photo);
  
  return {
    ...linkValidate,
    ...photoValidate,
  };
}

function validatePublicationText(str: string, locale: LocaleType) {
  const errors: Record<string, string> = {};
  if (str.length < 8) {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  return errors;
}
function getPublicationTextBlockValidation(content: ITextContentBlock['content']): Record<string, Record<string, string> | string> {
  const textUk = validatePublicationText(content.text.uk, 'uk');
  const textEn = validatePublicationText(content.text.en, 'en');
  
  const result: Record<string, Record<string, string> | string> = {};
  
  if (Object.values(textUk).length > 0 || Object.values(textEn).length > 0) {
    result.text = {
      ...textEn,
      ...textUk,
    };
  }
  
  return {
    ...result,
  };
}

function validatePublicationFile(content: IPdfContentBlock['content']): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!content.file) {
    errors.file = t('requiredField');
    return errors;
  }
  
  return errors;
}

function getPublicationPdfBlockValidation(content: IPdfContentBlock['content']): Record<string, Record<string, string> | string> {
  const file = validatePublicationFile(content);
  
  return {
    ...file,
  };
}

export function getContentBlockValidation(contentBlock: ICreatePublicationContentBlock): Record<string, Record<string, string> | string> {
  switch (contentBlock.type) {
  case PUBLICATION_BLOCK_TYPES.Y_VIDEO:
    return getPublicationVideoBlockValidation(contentBlock.content as IVideoContentBlock['content']);
  case PUBLICATION_BLOCK_TYPES.PHOTO:
    return getPublicationPhotoBlockValidation(contentBlock.content as IPhotoContentBlock['content']);
  case PUBLICATION_BLOCK_TYPES.TEXT:
    return getPublicationTextBlockValidation(contentBlock.content as ITextContentBlock['content']);
  case PUBLICATION_BLOCK_TYPES.PDF:
    return getPublicationPdfBlockValidation(contentBlock.content as IPdfContentBlock['content']);
  default:
    return {};
  }
}

export function getCreatePublicationTotalValidation(mainInfo: ICreatePublicationMain, contentBlocks: ICreatePublicationContentBlock[]) {
  const mainInfoValidate = getPublicationMainValidation(mainInfo);

  if (Object.values(mainInfoValidate).length > 0) {
    getNotification(`${t('incorrectDataInForm')}`, 'error');
    return false;
  }
  
  if (contentBlocks.length < 1) {
    getNotification(t('atLeast1ContentBlock'), 'error');
    return false;
  }
  
  const contentBlocksValidate: boolean[] = contentBlocks.map((item) => {
    return Object.values(getContentBlockValidation(item)).length > 0;
  });
  
  if (contentBlocksValidate.includes(true)) {
    getNotification(`${t('errorIn', { value: `${t('contentBlockNumber', { value: contentBlocksValidate.indexOf(true) + 1 })}` })}`, 'error');
    return false;
  }
  
  return true;
}
