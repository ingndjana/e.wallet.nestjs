import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards';
import { UserPayload } from '../../interfaces';
import { UserService } from '../user.service';
import { UserLoggedToken } from './dto';

@ApiTags('users')
@Controller('users')
export class LoginController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 200,
    type: UserLoggedToken,
  })
  async login(@Request() req): Promise<UserLoggedToken> {
    const user: UserPayload = req.user;

    return await this._userService.login(user);
  }
}
