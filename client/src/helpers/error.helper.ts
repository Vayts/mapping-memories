import { AUTH_ERRORS, ERRORS } from '@constants/errors';
import { getNotification } from '@src/notification/notifications';

import i18n from 'i18next';

const t = i18n.t;

export function errorManager(message: string): void {
  switch (message) {
  case ERRORS.INVALID_DATA:
    getNotification(t('invalidData'), 'error');
    break;
  case ERRORS.NO_ACCESS:
    getNotification(t('noAccess'), 'error');
    break;
  case AUTH_ERRORS.UNDEFINED_TOKEN:
    getNotification(t('undefinedToken'), 'error');
    break;
  case AUTH_ERRORS.WRONG_LOGIN_PASSWORD:
    getNotification(t('wrongPassword'), 'error');
    break;
  case AUTH_ERRORS.TOKEN_EXPIRED:
    getNotification(t('tokenExpired'), 'error');
    break;
  default:
    getNotification(t('somethingWentWrong'), 'error');
  }
}
