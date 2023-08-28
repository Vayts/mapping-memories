import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LocaleSchema } from './locale.schema';
import { PublicationContentBlock } from './interviewContentBlock.schema';

export type InterviewDocument = HydratedDocument<Interview>;

@Schema()
export class Interview {
  _id?: string;
  @Prop()
  title: LocaleSchema;
  @Prop()
  description: LocaleSchema;
  @Prop()
  photo: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ default: false })
  isFavorite: boolean;
  @Prop()
  contentBlocks: [PublicationContentBlock];
}

export const InterviewSchema = SchemaFactory.createForClass(Interview);
