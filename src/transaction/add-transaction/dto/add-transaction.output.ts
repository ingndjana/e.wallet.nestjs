import { Mode, TransactionType } from '../../../enums';
import { TransactionDocument } from '../../../schemas/transaction.schema';
import { User, UserDocument } from '../../../schemas/user.schema';
import { AddUserOutput } from '../../../user/add-user/dto';

export class AddTransactionOutput {
  constructor(
    transaction: TransactionDocument,
    balance: number,
    emitter?: UserDocument,
    receiver?: UserDocument,
  ) {
    this.id = transaction._id;
    this.type = transaction.type;
    this.emitter = emitter ? new AddUserOutput(emitter) : null;
    this.receiver = receiver ? new AddUserOutput(receiver) : null;
    this.amount = transaction.amount;
    this.pin = transaction.pin;
    this.mode = transaction.mode ? transaction.mode : null;
    this.balance = balance;
    this.date = transaction.date;
  }

  id: string;
  type: TransactionType;
  emitter?: AddUserOutput;
  receiver?: AddUserOutput;
  amount: number;
  pin: number;
  mode?: Mode;
  balance: number;
  date: Date;
}
