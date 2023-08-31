import { IPublication } from '@src/types/publication.types';

export interface IPublicationState {
  isLoading: boolean,
  currentPublication: IPublication | null,
  asideData: IPublication[],
}
