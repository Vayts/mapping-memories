import { IPublication } from '@src/types/publication.types';

export interface IEditPublicationState {
  publication: IPublication | null,
  isLoading: boolean,
  hasBeenEdited: boolean,
}
