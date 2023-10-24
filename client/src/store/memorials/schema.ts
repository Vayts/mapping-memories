import { schema } from 'normalizr';

export const memorialSchema = new schema.Entity('memorials', {}, { idAttribute: '_id' });
