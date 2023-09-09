import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  _id?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user_id: User;

  @Prop()
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
