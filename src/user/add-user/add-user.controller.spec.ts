import { Test, TestingModule } from '@nestjs/testing';
import { AddUserController } from './add-user.controller';
import { AddUserService } from './add-user.service';

describe('AddUserController', () => {
  let controller: AddUserController;

  const mockAddUserService = {
    register: jest.fn((dto) => {
      return {
        _id: Date.now().toString(),
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddUserController],
      providers: [AddUserService],
    })
      .overrideProvider(AddUserService)
      .useValue(mockAddUserService)
      .compile();

    controller = module.get<AddUserController>(AddUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.register({
        name: 'Gautier',
        email: 'gautier@gmail.com',
        password: 'gautier',
      }),
    ).toEqual({
      _id: expect.any(String),
      name: 'Gautier',
      email: 'gautier@gmail.com',
      password: expect.any(String),
    });
  });
});
