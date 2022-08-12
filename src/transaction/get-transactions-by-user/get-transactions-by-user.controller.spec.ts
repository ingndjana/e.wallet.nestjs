import { Test, TestingModule } from '@nestjs/testing';
import { GetTransactionsByUserController } from './get-transactions-by-user.controller';
import { GetTransactionsByUserService } from './get-transactions-by-user.service';

describe('GetTransactionsByUserController', () => {
  let controller: GetTransactionsByUserController;

  const mockGetTransactionsByUserService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetTransactionsByUserController],
      providers: [GetTransactionsByUserService],
    })
      .overrideProvider(GetTransactionsByUserService)
      .useValue(mockGetTransactionsByUserService)
      .compile();

    controller = module.get<GetTransactionsByUserController>(
      GetTransactionsByUserController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
