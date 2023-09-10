import { IAdminPublication } from '@src/types/publication.types';

export interface IAdminPublicationsState {
  isLoading: boolean,
  data: IAdminPublication[],
  isLoadingItems: string[]
  searchValue: string,
}
