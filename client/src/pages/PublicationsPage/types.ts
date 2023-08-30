import { PublicationType } from '@src/types/publication.types';

export interface IPublicationsPageProps {
  type?: PublicationType | '',
  withFavorite?: boolean,
}
