import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Mode, TransactionType } from '../enums';
import * as mongoose from 'mongoose';
import { Wallet } from './wallet.schema';
import { User } from './user.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({
    enum: TransactionType,
    default: TransactionType.DEPOSIT,
    required: true,
  })
  type: TransactionType;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Emitter',
    required: false,
  })
  emitter?: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Receiver',
    required: false,
  })
  receiver?: User;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  pin: number;

  @Prop({ enum: Mode, default: Mode.STRIPE_API, required: false })
  mode?: Mode;

  @Prop()
  date: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WalletEmitter',
    required: false,
  })
  walletEmitter?: Wallet;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'walletReceiver',
    required: false,
  })
  walletReceiver?: Wallet;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
