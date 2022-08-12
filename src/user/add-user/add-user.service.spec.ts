import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserSchema } from '../../schemas/user.schema';
import { AddUserService } from './add-user.service';

describe('AddUserService', () => {
  let service: AddUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/e-wallet-db'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [AddUserService],
    }).compile();

    service = module.get<AddUserService>(AddUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
