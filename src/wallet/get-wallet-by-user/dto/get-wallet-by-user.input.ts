import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class GetWalletByUserInput {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email?: string;
}
