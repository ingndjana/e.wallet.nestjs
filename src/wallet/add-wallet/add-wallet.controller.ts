import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserConnected } from '../../decorators';
import { JwtAuthGuard } from '../../guards';
import { UserPayload } from '../../interfaces';
import { AddWalletService } from './add-wallet.service';
import { AddWalletOutput } from './dto';

@ApiTags('wallets')
@Controller('wallets')
export class AddWalletController {
  constructor(private addWalletService: AddWalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    type: AddWalletOutput,
  })
  async addWallet(
    @UserConnected() user: UserPayload,
  ): Promise<AddWalletOutput> {
    return await this.addWalletService.addWallet(user);
  }
}
