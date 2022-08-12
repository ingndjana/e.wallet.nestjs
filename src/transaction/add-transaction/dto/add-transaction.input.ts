import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { TransactionType } from '../../../enums';

export class AddTransactionInput {
  @IsNotEmpty()
  @IsEnum(TransactionType)
  @ApiProperty({ enum: TransactionType })
  transactionType: TransactionType;

  @IsOptional()
  @ApiPropertyOptional()
  receiverWalletId?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;
}
