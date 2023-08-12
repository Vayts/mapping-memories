import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MarkerType } from './markerType.schema';
import { LocaleSchema } from './locale.schema';
import { CityMarker } from './cityMarker.schema';

export type MemorialMarkerDocument = HydratedDocument<MemorialMarker>;

@Schema()
export class MemorialMarker {
  _id?: string;
  @Prop()
  lat: number;
  @Prop()
  lng: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'MarkerType' })
  type_id: MarkerType;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CityMarker' })
  city_id: CityMarker;
  @Prop()
  address: LocaleSchema;
  @Prop()
  description: LocaleSchema;
  @Prop()
  title: LocaleSchema;
  @Prop({ default: null })
  img: string;
  @Prop({ default: null })
  img_source: string;
  @Prop()
  link: string;
  @Prop()
  icon: string;
}

export const MemorialMarkerSchema =
  SchemaFactory.createForClass(MemorialMarker);
