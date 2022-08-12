import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards';
import { GetTransactionsInput, GetTransactionsOutput } from './dto';
import { GetTransactionsService } from './get-transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class GetTransactionsController {
  constructor(private getTransactionsService: GetTransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    type: GetTransactionsOutput,
  })
  async getTransactions(
    @Query() pagination: GetTransactionsInput,
  ): Promise<GetTransactionsOutput> {
    return await this.getTransactionsService.getTransactions(pagination);
  }
}
