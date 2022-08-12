import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { response } from 'express';
import { UserService } from '../user.service';
import { LoginController } from './login.controller';

describe('LoginController', () => {
  let controller: LoginController;

  const mockJwtService = {};

  const mockUserAuthService = {
    login: jest.fn((dto) => {
      return {
        name: 'Gautier',
        email: 'gautier@gmail.com',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [UserService, JwtService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserAuthService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should authentificate', () => {
  //   expect(
  //     controller.login({ email: 'gautier@gmail.com', password: 'gautier' }),
  //   ).toEqual({
  //     name: 'Gautier',
  //     email: 'gautier@gmail.com',
  //   });
  // });
});
