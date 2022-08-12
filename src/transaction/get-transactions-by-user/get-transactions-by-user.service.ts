import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from '../../interfaces';
import {
  Transaction,
  TransactionDocument,
} from '../../schemas/transaction.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { TransactionOutputModel } from '../../types';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  TransactionItemOutput,
} from '../get-transactions/dto';
import { GetTransactionsByUserInput, GetTransactionsByUserOutput } from './dto';

@Injectable()
export class GetTransactionsByUserService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getTransactionsByUser(
    input: GetTransactionsByUserInput,
    user: UserPayload,
  ): Promise<GetTransactionsByUserOutput> {
    try {
      const { pagination } = input;
      const { pageIndex, pageSize } = pagination;
      const skip = pageSize * ((pageIndex || DEFAULT_PAGE_INDEX) - 1);
      const take = pageSize || DEFAULT_PAGE_SIZE;

      const userInput = await this.userModel.findOne(user);
      if (!userInput) {
        throw new NotFoundException(`The user '${user.name}' was not found`);
      }

      const allTransactions: TransactionOutputModel[] = [];

      const transactions = await this.transactionModel
        .find({
          $or: [{ emitter: userInput._id }, { receiver: userInput._id }],
        })
        .skip(skip)
        .limit(take)
        .sort({ date: 'desc' })
        .exec();

      const len = transactions.length;

      for (let j = 0; j < len; j++) {
        const transaction = transactions[j];

        const emitter = await this.userModel
          .findById(transaction.emitter)
          .exec();
        const receiver = await this.userModel
          .findById(transaction.receiver)
          .exec();

        const isTransactionInArray = allTransactions.find(
          (t) => t.transaction.pin === transaction.pin,
        );

        if (!isTransactionInArray) {
          allTransactions.push({ transaction, emitter, receiver });
        }
      }

      const allTransactionsCount = await this.transactionModel
        .find({
          $or: [{ emitter: userInput._id }, { receiver: userInput._id }],
        })
        .exec();

      return new GetTransactionsByUserOutput(
        allTransactions.map(
          (item) =>
            new TransactionItemOutput(
              item.transaction,
              item.emitter,
              item.receiver,
            ),
        ),
        allTransactionsCount.length,
        pageIndex,
        pageSize,
      );
    } catch (error) {
      throw new ConflictException(
        `${GetTransactionsByUserService.name}`,
        error.response ? error.response : error,
      );
    }
  }
}
