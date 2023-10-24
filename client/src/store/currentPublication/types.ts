import { IPublication } from '@src/types/publication.types';

export interface ICurrentPublicationState {
  isLoading: boolean,
  currentPublication: IPublication | null,
  asideData: IPublication[],
}
