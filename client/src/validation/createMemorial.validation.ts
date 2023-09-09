import { IAddMemorialState } from '@src/types/markers.types';
import { LocaleType } from '@src/types/locale.types';
import i18n from 'i18next';
import { MEMORIAL_VALIDATION } from '@constants/addMemorial';
import { LINK_REGEX, ONLY_NUMBER_REGEX } from '@constants/regex';
import { CoordsType } from '@src/types/coords.types';
import { MEMORIAL_ICONS } from '@constants/memorialIcons';

const { t } = i18n;

function validateMemorialMarkerTitle(str: string, locale: LocaleType) {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < MEMORIAL_VALIDATION.TITLE_MIN) {
    errors[locale] = t('atLeast', { value: MEMORIAL_VALIDATION.TITLE_MIN });
    return errors;
  }
  
  if (str.length > MEMORIAL_VALIDATION.TITLE_MAX) {
    errors[locale] = t('lessThan', { value: MEMORIAL_VALIDATION.TITLE_MAX });
    return errors;
  }
  
  return errors;
}

function validateMemorialMarkerDescription(str: string, locale: LocaleType) {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < MEMORIAL_VALIDATION.DESCRIPTION_MIN) {
    errors[locale] = t('atLeast', { value: MEMORIAL_VALIDATION.DESCRIPTION_MIN });
    return errors;
  }
  
  if (str.length > MEMORIAL_VALIDATION.DESCRIPTION_MAX) {
    errors[locale] = t('lessThan', { value: MEMORIAL_VALIDATION.DESCRIPTION_MAX });
    return errors;
  }
  
  return errors;
}

function validateMemorialMarkerAddress(str: string, locale: LocaleType) {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < MEMORIAL_VALIDATION.ADDRESS_MIN) {
    errors[locale] = t('atLeast', { value: MEMORIAL_VALIDATION.ADDRESS_MIN });
    return errors;
  }
  
  if (str.length > MEMORIAL_VALIDATION.ADDRESS_MAX) {
    errors[locale] = t('lessThan', { value: MEMORIAL_VALIDATION.ADDRESS_MAX });
    return errors;
  }
  
  return errors;
}

function validateMemorialSourceLink(link: string, field: 'photo_source' | 'link') {
  const errors: Record<string, string> = {};
  
  if (link !== '') {
    if (!LINK_REGEX.test(link)) {
      errors[field] = t('incorrectLink');
      return errors;
    }
  }
  
  return errors;
}

function validateMemorialMarkerCoords(value: string, coordsName: CoordsType) {
  const errors: Record<string, string> = {};
  
  if (!value) {
    errors[coordsName] = t('requiredField');
    return errors;
  }
  
  const number = parseFloat(value);
  
  if (!ONLY_NUMBER_REGEX.test(value)) {
    errors[coordsName] = t('onlyNumbers');
    return errors;
  }
  
  if (number > MEMORIAL_VALIDATION.LAT_LNG_MAX) {
    errors[coordsName] = t('lessThanNumber', { value: MEMORIAL_VALIDATION.LAT_LNG_MAX });
    return errors;
  }
  
  if (number < MEMORIAL_VALIDATION.LAT_LNG_MIN) {
    errors[coordsName] = t('atLeastNumber', { value: MEMORIAL_VALIDATION.LAT_LNG_MIN });
    return errors;
  }
  
  return errors;
}

function validateMemorialIcon(value: string) {
  const errors: Record<string, string> = {};
  
  if (!value) {
    errors.icon = t('requiredField');
    return errors;
  }
  
  if (!MEMORIAL_ICONS.includes(value)) {
    errors.icon = t('somethingWentWrong');
  }
  
  return errors;
}

export function getMemorialMarkerValidation(values: IAddMemorialState) {
  const result: Record<string, Record<string, string>> = {};
  const titleUk = validateMemorialMarkerTitle(values.title.uk, 'uk');
  const titleEn = validateMemorialMarkerTitle(values.title.en, 'en');
  const descriptionUk = validateMemorialMarkerDescription(values.description.uk, 'uk');
  const descriptionEn = validateMemorialMarkerDescription(values.description.en, 'en');
  const addressUk = validateMemorialMarkerAddress(values.address.uk, 'uk');
  const addressEn = validateMemorialMarkerAddress(values.address.en, 'en');
  const link = validateMemorialSourceLink(values.link, 'link');
  const photoSource = validateMemorialSourceLink(values.photo_source, 'photo_source');
  const lat = validateMemorialMarkerCoords(values.lat, 'lat');
  const lng = validateMemorialMarkerCoords(values.lng, 'lng');
  const icon = validateMemorialIcon(values.icon);
  
  if (Object.values(titleEn).length > 0 || Object.values(titleUk).length > 0) {
    result.title = {
      ...titleEn,
      ...titleUk,
    };
  }
  
  if (Object.values(descriptionEn).length > 0 || Object.values(descriptionUk).length > 0) {
    result.description = {
      ...descriptionEn,
      ...descriptionUk,
    };
  }
  
  if (Object.values(addressEn).length > 0 || Object.values(addressUk).length > 0) {
    result.address = {
      ...addressEn,
      ...addressUk,
    };
  }
  
  return {
    ...result,
    ...lat,
    ...lng,
    ...photoSource,
    ...link,
    ...icon,
  };
}
