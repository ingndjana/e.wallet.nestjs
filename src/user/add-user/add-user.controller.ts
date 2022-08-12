import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserService } from './add-user.service';
import { AddUserInput, AddUserOutput } from './dto';

@ApiTags('users')
@Controller('users')
export class AddUserController {
  constructor(private addUserService: AddUserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: AddUserOutput,
  })
  register(@Body() input: AddUserInput) {
    return this.addUserService.register(input);
  }
}
