import { PublicationEnum } from '@src/types/publication.types';

export interface IPublicationsPageProps {
  type?: PublicationEnum | '',
  withFavorite?: boolean,
}
