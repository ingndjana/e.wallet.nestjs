import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../../schemas/user.schema';
import { Wallet, WalletSchema } from '../../schemas/wallet.schema';
import {
  Transaction,
  TransactionSchema,
} from '../../schemas/transaction.schema';
import { GetTransactionsByUserService } from './get-transactions-by-user.service';

describe('GetTransactionsByUserService', () => {
  let service: GetTransactionsByUserService;

  const mockTransactionModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
        MongooseModule.forFeature([
          { name: Transaction.name, schema: TransactionSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [GetTransactionsByUserService],
    }).compile();

    service = module.get<GetTransactionsByUserService>(
      GetTransactionsByUserService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
