import { schema } from 'normalizr';

export const memorialTypeSchema = new schema.Entity('memorialTypes', {}, { idAttribute: '_id' });
