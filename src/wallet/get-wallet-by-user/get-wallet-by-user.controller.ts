import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserConnected } from 'src/decorators';
import { JwtAuthGuard } from 'src/guards';
import { UserPayload } from 'src/interfaces';
import { GetWalletByUserInput, GetWalletByUserOutput } from './dto';
import { GetWalletByUserService } from './get-wallet-by-user.service';

@ApiTags('wallets')
@Controller('wallets')
export class GetWalletByUserController {
  constructor(
    private readonly getWalletByUserService: GetWalletByUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    type: GetWalletByUserOutput,
  })
  async getWalletByUser(
    @Query() email: GetWalletByUserInput,
    @UserConnected() user: UserPayload,
  ): Promise<GetWalletByUserOutput> {
    return await this.getWalletByUserService.getWalletByUser(user, email);
  }
}
