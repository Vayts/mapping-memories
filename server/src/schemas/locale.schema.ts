import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false, versionKey: false })
export class LocaleSchema {
  @Prop()
  uk: string;
  @Prop()
  en: string;
}
