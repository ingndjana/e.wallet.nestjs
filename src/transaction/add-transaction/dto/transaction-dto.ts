import { Mode, TransactionType } from 'src/enums';
import { User } from 'src/schemas/user.schema';
import { Wallet } from 'src/schemas/wallet.schema';

export class TransactionDto {
  type: TransactionType;
  emitter?: User;
  receiver?: User;
  amount: number;
  pin: number;
  mode?: Mode;
  walletEmitter?: Wallet;
  walletReceiver?: Wallet;
  date: Date;
}
