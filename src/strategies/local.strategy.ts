import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserPayload } from 'src/interfaces';
import { LoginCredentialsInput } from 'src/user/login/dto';
import { LoginService } from 'src/user/login/login.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _loginService: LoginService) {
    super({ usernameField: 'email', passwordField: 'inputPassword' });
  }

  async validate(email: string, inputPassword: string): Promise<UserPayload> {
    const credentials: LoginCredentialsInput = {
      email,
      inputPassword,
    };

    const user = await this._loginService.validateUser(credentials);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
