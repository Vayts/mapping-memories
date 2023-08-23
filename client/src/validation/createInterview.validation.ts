import i18n from 'i18next';
import { INTERVIEW_VALIDATION } from '@constants/createInterview';
import {
  ICreateInterviewMain,
  ICreateInterviewContentBlock,
  IPhotoContentBlock,
  ITextContentBlock,
  IVideoContentBlock,
} from '@src/types/createInterviewTypes';
import { INTERVIEW_BLOCK_TYPES } from '@constants/interviewContentBlocks';
import { getNotification } from '@src/notification/notifications';
import { LINK_REGEX, YOUTUBE_EMBED_REGEX } from '@constants/regex';
import { LocaleType } from '@src/types/types';

const { t } = i18n;

function validateInterviewTitle(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }

  if (str.length < INTERVIEW_VALIDATION.LIMIT.TITLE_MIN) {
    errors[locale] = t('atLeast', { value: INTERVIEW_VALIDATION.LIMIT.TITLE_MIN });
    return errors;
  }
  
  if (str.length > INTERVIEW_VALIDATION.LIMIT.TITLE_MAX) {
    errors[locale] = t('lessThan', { value: INTERVIEW_VALIDATION.LIMIT.TITLE_MAX });
    return errors;
  }
  
  return errors;
}

function validateInterviewDescription(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < INTERVIEW_VALIDATION.LIMIT.DESCRIPTION_MIN) {
    errors[locale] = t('atLeast', { value: INTERVIEW_VALIDATION.LIMIT.DESCRIPTION_MIN });
    return errors;
  }
  
  if (str.length > INTERVIEW_VALIDATION.LIMIT.DESCRIPTION_MAX) {
    errors[locale] = t('lessThan', { value: INTERVIEW_VALIDATION.LIMIT.DESCRIPTION_MAX });
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

export function getInterviewMainValidation(mainInfo: ICreateInterviewMain): Record<string, Record<string, string> | string> {
  const titleUk = validateInterviewTitle(mainInfo.title.uk, 'uk');
  const titleEn = validateInterviewTitle(mainInfo.title.en, 'en');
  const descriptionUk = validateInterviewDescription(mainInfo.description.uk, 'uk');
  const descriptionEn = validateInterviewDescription(mainInfo.description.en, 'en');
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
  };
}

function validateInterviewVideoLink(link: string) {
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

export function getInterviewVideoBlockValidation(content: IVideoContentBlock['content']): Record<string, Record<string, string> | string> {
  const linkValidate = validateInterviewVideoLink(content.link);
  
  return {
    ...linkValidate,
  };
}

function validateInterviewPhotoSourceLink(link: string) {
  const errors: Record<string, string> = {};
  
  if (link !== '') {
    if (!LINK_REGEX.test(link)) {
      errors.source = t('incorrectLink');
      return errors;
    }
  }
  
  return errors;
}

function getInterviewPhotoBlockValidation(content: IPhotoContentBlock['content']): Record<string, Record<string, string> | string> {
  const linkValidate = validateInterviewPhotoSourceLink(content.source);
  const photoValidate = validateRequiredPhoto(content.photo);
  
  return {
    ...linkValidate,
    ...photoValidate,
  };
}

function validateInterviewText(str: string, locale: LocaleType) {
  const errors: Record<string, string> = {};
  if (str.length < 8) {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  return errors;
}
function getInterviewTextBlockValidation(content: ITextContentBlock['content']): Record<string, Record<string, string> | string> {
  const textUk = validateInterviewText(content.text.uk, 'uk');
  const textEn = validateInterviewText(content.text.en, 'en');
  
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

export function getContentBlockValidation(contentBlock: ICreateInterviewContentBlock): Record<string, Record<string, string> | string> {
  switch (contentBlock.type) {
  case INTERVIEW_BLOCK_TYPES.Y_VIDEO:
    return getInterviewVideoBlockValidation(contentBlock.content as IVideoContentBlock['content']);
  case INTERVIEW_BLOCK_TYPES.PHOTO:
    return getInterviewPhotoBlockValidation(contentBlock.content as IPhotoContentBlock['content']);
  case INTERVIEW_BLOCK_TYPES.TEXT:
    return getInterviewTextBlockValidation(contentBlock.content as ITextContentBlock['content']);
  default:
    return {};
  }
}

export function getCreateInterviewTotalValidation(mainInfo: ICreateInterviewMain, contentBlocks: ICreateInterviewContentBlock[]) {
  const mainInfoValidate = getInterviewMainValidation(mainInfo);

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
