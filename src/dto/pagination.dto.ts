import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '../transaction/get-transactions/dto';

export class PaginationDto {
  @ApiPropertyOptional({ default: DEFAULT_PAGE_INDEX })
  pageIndex?: number = DEFAULT_PAGE_INDEX;
  @ApiPropertyOptional({ default: DEFAULT_PAGE_SIZE })
  pageSize?: number = DEFAULT_PAGE_SIZE;
}
