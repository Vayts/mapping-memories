import { ICreateMemorialTypeState } from '@src/types/markers.types';
import i18n from 'i18next';
import { MEMORIAL_TYPE_VALIDATION } from '@constants/createMeorialType';

const { t } = i18n;

function validateMemorialTypeName(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str.trim() === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.trim().length < MEMORIAL_TYPE_VALIDATION.NAME_MIN) {
    errors[locale] = t('atLeast', { value: MEMORIAL_TYPE_VALIDATION.NAME_MIN });
    return errors;
  }
  
  if (str.trim().length > MEMORIAL_TYPE_VALIDATION.NAME_MAX) {
    errors[locale] = t('lessThan', { value: MEMORIAL_TYPE_VALIDATION.NAME_MAX });
    return errors;
  }
  
  return errors;
}

export function getMemorialTypeValidation(values: ICreateMemorialTypeState) {
  const result: Record<string, Record<string, string>> = {};
  const nameUk = validateMemorialTypeName(values.name.uk, 'uk');
  const nameEn = validateMemorialTypeName(values.name.en, 'en');
  
  if (Object.values(nameEn).length > 0 || Object.values(nameUk).length > 0) {
    result.name = {
      ...nameEn,
      ...nameUk,
    };
  }
  
  return result;
}
