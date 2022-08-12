import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Wallet, WalletSchema } from '../../schemas/wallet.schema';
import {
  Transaction,
  TransactionSchema,
} from '../../schemas/transaction.schema';
import { AddTransactionService } from './add-transaction.service';
import { User, UserSchema } from '../../schemas/user.schema';
import { TransactionPinService } from '../../services';
import { StripeModule } from 'nestjs-stripe';

describe('AddTransactionService', () => {
  let service: AddTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
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
      providers: [AddTransactionService, TransactionPinService],
    }).compile();

    service = module.get<AddTransactionService>(AddTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
