import { Mode, TransactionType } from '../../../enums';
import { Transaction } from '../../../schemas/transaction.schema';
import { User } from '../../../schemas/user.schema';
import { UserItemOutput } from '../../../wallet/add-wallet/dto';

export class GetTransactionsOutput {
  items: TransactionItemOutput[];
  totalItemsCount: number;
  pageIndex: number;
  pageSize: number;

  constructor(
    items: TransactionItemOutput[],
    totalItemsCount: number,
    pageIndex: number,
    pageSize: number,
  ) {
    this.items = items;
    this.totalItemsCount = totalItemsCount;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}

export class TransactionItemOutput {
  constructor(transaction: Transaction, emitter?: User, receiver?: User) {
    this.type = transaction.type;
    this.emitter = emitter ? new UserItemOutput(emitter) : null;
    this.receiver = receiver ? new UserItemOutput(receiver) : null;
    this.amount = transaction.amount;
    this.pin = transaction.pin;
    this.mode = transaction.mode ? transaction.mode : null;
    this.date = transaction.date;
  }

  type: TransactionType;
  emitter?: UserItemOutput;
  receiver?: UserItemOutput;
  amount: number;
  pin: number;
  mode?: Mode;
  date: Date;
}
