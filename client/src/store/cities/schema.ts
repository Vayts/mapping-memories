import { schema } from 'normalizr';

export const citySchema = new schema.Entity('cities', {}, { idAttribute: '_id' });
