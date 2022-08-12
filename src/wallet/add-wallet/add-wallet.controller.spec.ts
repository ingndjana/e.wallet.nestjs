import { Test, TestingModule } from '@nestjs/testing';
import { AddWalletController } from './add-wallet.controller';
import { AddWalletService } from './add-wallet.service';

describe('AddWalletController', () => {
  let controller: AddWalletController;

  const mockAddWalletService = {
    addWallet: jest.fn((dto) => {
      return {
        balance: 0,
        pin: 1234,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddWalletController],
      providers: [AddWalletService],
    })
      .overrideProvider(AddWalletService)
      .useValue(mockAddWalletService)
      .compile();

    controller = module.get<AddWalletController>(AddWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create a wallet', () => {
  //   expect(
  //     controller.addWallet({ name: 'Gautier', email: 'gautier@gmail.com' }),
  //   ).toEqual({
  //     balance: 0,
  //     pin: 1234,
  //   });
  // });
});
