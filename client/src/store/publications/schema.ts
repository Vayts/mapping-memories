import { schema } from 'normalizr';

export const publicationSchema = new schema.Entity('publications', {}, { idAttribute: '_id' });
