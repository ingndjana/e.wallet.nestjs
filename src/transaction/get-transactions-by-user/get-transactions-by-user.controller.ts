import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserConnected } from '../../decorators';
import { PaginationDto } from '../../dto';
import { JwtAuthGuard } from '../../guards';
import { UserPayload } from '../../interfaces';
import { GetTransactionsByUserInput, GetTransactionsByUserOutput } from './dto';
import { GetTransactionsByUserService } from './get-transactions-by-user.service';

@ApiTags('transactions')
@Controller('transactions')
export class GetTransactionsByUserController {
  constructor(
    private getTransactionsByUserService: GetTransactionsByUserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  @ApiResponse({
    status: 200,
    type: GetTransactionsByUserOutput,
  })
  async getTransactionsByUser(
    @Query() pagination: PaginationDto,
    @UserConnected() user: UserPayload,
  ): Promise<GetTransactionsByUserOutput> {
    const input: GetTransactionsByUserInput = { pagination };

    return await this.getTransactionsByUserService.getTransactionsByUser(
      input,
      user,
    );
  }
}
