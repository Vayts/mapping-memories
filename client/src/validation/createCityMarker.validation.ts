import { ICreateCityMarkerState } from '@src/types/markers.types';
import i18n from 'i18next';
import { CITY_MARKER_VALIDATION } from '@constants/createCityMarker';
import { CoordsType } from '@src/types/coords.types';
import { ONLY_NUMBER_REGEX } from '@constants/regex';

const { t } = i18n;

function validateCityMarkerName(str: string, locale: string): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (str === '') {
    errors[locale] = t('requiredField');
    return errors;
  }
  
  if (str.length < CITY_MARKER_VALIDATION.NAME_MIN) {
    errors[locale] = t('atLeast', { value: CITY_MARKER_VALIDATION.NAME_MIN });
    return errors;
  }
  
  if (str.length > CITY_MARKER_VALIDATION.NAME_MAX) {
    errors[locale] = t('lessThan', { value: CITY_MARKER_VALIDATION.NAME_MAX });
    return errors;
  }
  
  return errors;
}

function validateCityMarkerCoords(value: string, coordsName: CoordsType) {
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
  
  if (number > CITY_MARKER_VALIDATION.LAT_LNG_MAX) {
    errors[coordsName] = t('lessThanNumber', { value: CITY_MARKER_VALIDATION.LAT_LNG_MAX });
    return errors;
  }
  
  if (number < CITY_MARKER_VALIDATION.LAT_LNG_MIN) {
    errors[coordsName] = t('atLeastNumber', { value: CITY_MARKER_VALIDATION.LAT_LNG_MIN });
    return errors;
  }
  
  return errors;
}

export function getCityMarkerValidation(values: ICreateCityMarkerState) {
  const result: Record<string, Record<string, string>> = {};
  const nameUk = validateCityMarkerName(values.name.uk, 'uk');
  const nameEn = validateCityMarkerName(values.name.en, 'en');
  const latValidation = validateCityMarkerCoords(values.lat, 'lat');
  const lngValidation = validateCityMarkerCoords(values.lng, 'lng');
  
  if (Object.values(nameEn).length > 0 || Object.values(nameUk).length > 0) {
    result.name = {
      ...nameEn,
      ...nameUk,
    };
  }
  
  return {
    ...result,
    ...latValidation,
    ...lngValidation,
  };
}
