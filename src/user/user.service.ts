import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/interfaces';
import { UserLoggedToken } from './login/dto';

@Injectable()
export class UserService {
  constructor(private readonly _jwtService: JwtService) {}

  async login(user: UserPayload): Promise<UserLoggedToken> {
    const jwt = this._jwtService.sign(user);

    return new UserLoggedToken(jwt);
  }
}
