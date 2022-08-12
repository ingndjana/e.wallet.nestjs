import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true, unique: true, length: 4 })
  pin: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
