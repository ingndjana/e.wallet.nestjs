import { Test, TestingModule } from '@nestjs/testing';
import { TransactionType } from '../../enums';
import { AddTransactionController } from './add-transaction.controller';
import { AddTransactionService } from './add-transaction.service';

describe('AddTransactionController', () => {
  let controller: AddTransactionController;

  const mockAddTransactionService = {
    addTransaction: jest.fn((dto) => {
      return {
        id: Date.now().toString(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddTransactionController],
      providers: [AddTransactionService],
    })
      .overrideProvider(AddTransactionService)
      .useValue(mockAddTransactionService)
      .compile();

    controller = module.get<AddTransactionController>(AddTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create a transaction', () => {
  //   expect(
  //     controller.addTransaction(
  //       { transactionType: TransactionType.DEPOSIT, amount: 5000 },
  //       { name: 'Gautier', email: 'gautier@gmail.com' },
  //     ),
  //   ).toEqual({
  //     id: expect.any(String),
  //     type: TransactionType.DEPOSIT,
  //     amount: 5000,
  //   });
  // });
});
