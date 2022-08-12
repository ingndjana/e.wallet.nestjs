import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from '../../schemas/transaction.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { TransactionOutputModel } from '../../types';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  GetTransactionsInput,
  GetTransactionsOutput,
  TransactionItemOutput,
} from './dto';

@Injectable()
export class GetTransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTransactions(
    input: GetTransactionsInput,
  ): Promise<GetTransactionsOutput> {
    try {
      const { pageIndex, pageSize } = input;
      const skip = pageSize * ((pageIndex || DEFAULT_PAGE_INDEX) - 1);
      const take = pageSize || DEFAULT_PAGE_SIZE;

      const transactions = await this.transactionModel
        .find()
        .skip(skip)
        .limit(take)
        .sort({ date: 'desc' })
        .exec();

      const allTransactions: TransactionOutputModel[] = [];
      const len = transactions.length;

      for (let i = 0; i < len; i++) {
        const transaction = transactions[i];

        const emitter = await this.userModel
          .findById(transaction.emitter)
          .exec();
        const receiver = await this.userModel
          .findById(transaction.receiver)
          .exec();

        allTransactions.push({ transaction, emitter, receiver });
      }

      return new GetTransactionsOutput(
        allTransactions.map(
          (item) =>
            new TransactionItemOutput(
              item.transaction,
              item.emitter,
              item.receiver,
            ),
        ),
        transactions.length,
        pageIndex,
        pageSize,
      );
    } catch (error) {
      throw new ConflictException(
        `${GetTransactionsService.name}`,
        error.response ? error.response : error,
      );
    }
  }
}
