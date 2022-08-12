import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../schemas/transaction.schema';

@Injectable()
export class TransactionPinService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async generate(): Promise<number> {
    const transactions = await this.transactionModel.find();
    let pin: number = 0;
    let isPinExist: boolean = true;

    do {
      pin = this._randomNumber(4);
      isPinExist = transactions.some((t) => t.pin === pin);
    } while (isPinExist);

    return pin;
  }

  private _randomNumber(length: number): number {
    return Math.floor(
      Math.pow(10, length - 1) +
        Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1),
    );
  }
}
