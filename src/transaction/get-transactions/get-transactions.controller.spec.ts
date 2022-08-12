import { Test, TestingModule } from '@nestjs/testing';
import { GetTransactionsController } from './get-transactions.controller';
import { GetTransactionsService } from './get-transactions.service';

describe('GetTransactionsController', () => {
  let controller: GetTransactionsController;

  const mockGetTransactionsService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTransactionsController],
      providers: [GetTransactionsService],
    })
      .overrideProvider(GetTransactionsService)
      .useValue(mockGetTransactionsService)
      .compile();

    controller = module.get<GetTransactionsController>(
      GetTransactionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
