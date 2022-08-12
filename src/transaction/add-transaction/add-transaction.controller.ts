import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserConnected } from '../../decorators';
import { JwtAuthGuard } from '../../guards';
import { UserPayload } from '../../interfaces';
import { AddTransactionService } from './add-transaction.service';
import { AddTransactionInput, AddTransactionOutput } from './dto';

@ApiTags('transactions')
@Controller('transactions')
export class AddTransactionController {
  constructor(private addTransactionService: AddTransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    type: AddTransactionOutput,
  })
  async addTransaction(
    @Body() body: AddTransactionInput,
    @UserConnected() user: UserPayload,
  ): Promise<AddTransactionOutput> {
    return await this.addTransactionService.addTransaction(body, user);
  }
}
