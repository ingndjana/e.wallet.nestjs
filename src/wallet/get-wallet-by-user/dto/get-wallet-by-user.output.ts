import { WalletDocument } from 'src/schemas/wallet.schema';

export class GetWalletByUserOutput {
  constructor(wallet: WalletDocument, isMyWallet: boolean) {
    this.id = wallet.id;
    this.pin = !isMyWallet ? wallet.pin : null;
    this.balance = !isMyWallet ? wallet.balance : null;
  }

  id: string;
  pin: number;
  balance: number;
}
