import { TransactionItemOutput } from 'src/transaction/get-transactions/dto';

export class GetTransactionsByUserOutput {
  items: TransactionItemOutput[];
  totalItemsCount: number;
  pageIndex: number;
  pageSize: number;

  constructor(
    items: TransactionItemOutput[],
    totalItemsCount: number,
    pageIndex: number,
    pageSize: number,
  ) {
    this.items = items;
    this.totalItemsCount = totalItemsCount;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
  }
}
