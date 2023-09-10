import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { LocaleSchema } from './locale.schema';
import { PublicationContentBlock } from './publicationContentBlock.schema';

type PublicationType = 'interview' | 'artProject' | 'specialProject';

export type PublicationDocument = HydratedDocument<Publication>;

@Schema()
export class Publication {
  _id?: string;
  @Prop()
  title: LocaleSchema;
  @Prop({ enum: ['interview', 'artProject', 'specialProject'] })
  type: PublicationType;
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

export const PublicationSchema = SchemaFactory.createForClass(Publication);
