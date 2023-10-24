import { RootState } from '@src/store';
import { IUser } from '@src/types/user.types';

export const selectUser = (state: RootState): IUser | null => state.auth.user;
