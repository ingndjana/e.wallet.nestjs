import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletPinService } from '../../services';
import { User, UserSchema } from '../../schemas/user.schema';
import { Wallet, WalletSchema } from '../../schemas/wallet.schema';
import { AddWalletService } from './add-wallet.service';

describe('AddWalletService', () => {
  let service: AddWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
        MongooseModule.forFeature([
          { name: Wallet.name, schema: WalletSchema },
          { name: User.name, schema: UserSchema },
        ]),
      ],
      providers: [AddWalletService, WalletPinService],
    }).compile();

    service = module.get<AddWalletService>(AddWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
