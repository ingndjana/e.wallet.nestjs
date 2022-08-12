import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
    MongooseModule.forRoot(
      'mongodb+srv://nanodev:nanodev@cluster0.ikuhs.mongodb.net/eWalletDB?retryWrites=true&w=majority',
    ),
    UserModule,
    WalletModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
