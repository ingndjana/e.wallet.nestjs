import { Transaction } from 'src/schemas/transaction.schema';
import { User } from 'src/schemas/user.schema';

export type TransactionOutputModel = {
  transaction: Transaction;
  emitter?: User;
  receiver?: User;
};
