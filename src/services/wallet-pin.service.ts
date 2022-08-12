import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from '../schemas/wallet.schema';

@Injectable()
export class WalletPinService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async generate(): Promise<number> {
    const wallets = await this.walletModel.find();
    let pin: number = 0;
    let isPinExist: boolean = true;

    do {
      pin = this._randomNumber(4);
      isPinExist = wallets.some((wallet) => wallet.pin === pin);
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
