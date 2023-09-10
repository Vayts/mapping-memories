import { RootState } from '@src/store';
import { IAuthState } from '@src/store/login/types';

export const selectLoginData = (state: RootState): IAuthState['data'] => state.login.data;
export const selectLoginLoading = (state: RootState): boolean => state.login.isLoading;
