import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LocaleSchema } from './locale.schema';

export type MarkerTypeDocument = HydratedDocument<MarkerType>;

@Schema()
export class MarkerType {
  _id?: string;
  @Prop()
  name: LocaleSchema;
}

export const MarkerTypeSchema = SchemaFactory.createForClass(MarkerType);
