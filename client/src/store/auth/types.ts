import { IUser } from '@src/types/user.types';

export interface IAuthState {
  user: IUser | null,
  isLoading: boolean,
}
