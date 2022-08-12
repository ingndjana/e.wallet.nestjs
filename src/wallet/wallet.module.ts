import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { WalletPinService } from 'src/services';
import { AddWalletController } from './add-wallet/add-wallet.controller';
import { AddWalletService } from './add-wallet/add-wallet.service';
import { GetWalletByUserController } from './get-wallet-by-user/get-wallet-by-user.controller';
import { GetWalletByUserService } from './get-wallet-by-user/get-wallet-by-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AddWalletController, GetWalletByUserController],
  providers: [AddWalletService, WalletPinService, GetWalletByUserService],
})
export class WalletModule {}
