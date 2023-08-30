import { RootState } from '@src/store';
import { LocaleType } from '@src/types/types';

export const selectLocale = (state: RootState): LocaleType => state.app.locale;

export const selectIsAppLoading = (state: RootState): boolean => state.app.isLoading;
