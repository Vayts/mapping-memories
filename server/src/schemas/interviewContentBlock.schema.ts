import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
export class RecipeContentBlock {
  @Prop()
  _id: string;
  @Prop()
  type: string;
  @Prop({ type: [mongoose.Schema.Types.Mixed] })
  content: any;
}
