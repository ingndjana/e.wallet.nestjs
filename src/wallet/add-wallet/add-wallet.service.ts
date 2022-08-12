import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from '../../interfaces';
import { User, UserDocument } from '../../schemas/user.schema';
import { Wallet, WalletDocument } from '../../schemas/wallet.schema';
import { WalletPinService } from '../../services';
import { AddWalletOutput, WalletDto } from './dto';

@Injectable()
export class AddWalletService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private walletPinService: WalletPinService,
  ) {}

  async addWallet(userPayload: UserPayload): Promise<AddWalletOutput> {
    try {
      const user = await this.userModel.findOne(userPayload);
      if (!user) {
        throw new NotFoundException(`User '${userPayload.name}' not found`);
      }

      const pin = await this.walletPinService.generate();

      const walletDto: WalletDto = {
        balance: 0,
        pin,
        user,
      };

      const wallet = new this.walletModel(walletDto);
      await wallet.save();

      return new AddWalletOutput(wallet);
    } catch (error) {
      throw new ConflictException(
        `${AddWalletService.name}`,
        error.response ? error.response : error,
      );
    }
  }
}
