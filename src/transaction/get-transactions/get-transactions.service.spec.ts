import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../../schemas/user.schema';
import {
  Transaction,
  TransactionSchema,
} from '../../schemas/transaction.schema';
import { GetTransactionsService } from './get-transactions.service';

describe('GetTransactionsService', () => {
  let service: GetTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
        MongooseModule.forFeature([
          { name: Transaction.name, schema: TransactionSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [GetTransactionsService],
    }).compile();

    service = module.get<GetTransactionsService>(GetTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
