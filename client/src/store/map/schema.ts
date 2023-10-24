import { schema } from 'normalizr';
import { citySchema } from '@src/store/cities/schema';
import { memorialTypeSchema } from '@src/store/memorialTypes/schema';
import { memorialSchema } from '@src/store/memorials/schema';

export const mapSchema = new schema.Entity('map', {
  cities: [citySchema],
  memorialTypes: [memorialTypeSchema],
  memorials: [memorialSchema],
}, { idAttribute: '_id' });
