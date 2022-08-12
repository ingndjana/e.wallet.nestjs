import { User } from 'src/schemas/user.schema';
import { WalletDocument } from 'src/schemas/wallet.schema';

export class AddWalletOutput {
  constructor(wallet: WalletDocument) {
    this.balance = wallet.balance;
    this.pin = wallet.pin;
    this.user = new UserItemOutput(wallet.user);
  }

  balance: number;
  pin: number;
  user: UserItemOutput;
}

export class UserItemOutput {
  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
  }

  name: string;
  email: string;
}
