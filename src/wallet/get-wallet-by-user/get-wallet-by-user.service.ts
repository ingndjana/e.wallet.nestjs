import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from 'src/interfaces';
import { User, UserDocument } from 'src/schemas/user.schema';
import { Wallet, WalletDocument } from 'src/schemas/wallet.schema';
import { GetWalletByUserInput, GetWalletByUserOutput } from './dto';

@Injectable()
export class GetWalletByUserService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getWalletByUser(
    user: UserPayload,
    input?: GetWalletByUserInput,
  ): Promise<GetWalletByUserOutput> {
    try {
      const { email } = input;

      const owner = email
        ? await this.userModel.findOne({ email: email })
        : await this.userModel.findOne(user);

      if (!owner) {
        throw new NotFoundException(
          `There is no account '${email ? email : user.name}' on My E-Wallet`,
        );
      }

      const wallet = await this.walletModel.findOne({ user: owner._id });
      if (!wallet) {
        throw new NotFoundException(
          `The user '${
            email ? email : user.name
          }' does not have any wallet yet`,
        );
      }

      return new GetWalletByUserOutput(wallet, !!email);
    } catch (error) {
      throw new BadRequestException(
        `${GetWalletByUserService.name}`,
        error.response ? error.response : error,
      );
    }
  }
}
