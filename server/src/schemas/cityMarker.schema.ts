import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LocaleSchema } from './locale.schema';

export type CityMarkerDocument = HydratedDocument<CityMarker>;

@Schema()
export class CityMarker {
  _id?: string;
  @Prop()
  name: LocaleSchema;
  @Prop()
  lat: number;
  @Prop()
  lng: number;
  @Prop()
  icon: string;
}

export const CityMarkerSchema = SchemaFactory.createForClass(CityMarker);
