import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from 'src/schemas/transaction.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Wallet, WalletSchema } from 'src/schemas/wallet.schema';
import { TransactionPinService } from 'src/services';
import { AddTransactionController } from './add-transaction/add-transaction.controller';
import { AddTransactionService } from './add-transaction/add-transaction.service';
import { GetTransactionsController } from './get-transactions/get-transactions.controller';
import { GetTransactionsService } from './get-transactions/get-transactions.service';
import { GetTransactionsByUserController } from './get-transactions-by-user/get-transactions-by-user.controller';
import { GetTransactionsByUserService } from './get-transactions-by-user/get-transactions-by-user.service';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
    ]),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_API_KEY,
      apiVersion: '2020-08-27',
    }),
  ],
  controllers: [
    AddTransactionController,
    GetTransactionsController,
    GetTransactionsByUserController,
  ],
  providers: [
    AddTransactionService,
    TransactionPinService,
    GetTransactionsService,
    GetTransactionsByUserService,
  ],
})
export class TransactionModule {}
