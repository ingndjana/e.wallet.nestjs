import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from './pagination-default.constants';

export class GetTransactionsInput {
  @ApiPropertyOptional({ default: DEFAULT_PAGE_INDEX })
  pageIndex?: number = DEFAULT_PAGE_INDEX;
  @ApiPropertyOptional({ default: DEFAULT_PAGE_SIZE })
  pageSize?: number = DEFAULT_PAGE_SIZE;
}
