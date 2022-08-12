import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mode, TransactionType } from '../../enums';
import { UserPayload } from '../../interfaces';
import {
  Transaction,
  TransactionDocument,
} from '../../schemas/transaction.schema';
import { User, UserDocument } from '../../schemas/user.schema';
import { Wallet, WalletDocument } from '../../schemas/wallet.schema';
import { TransactionPinService } from '../../services';
import {
  AddTransactionInput,
  AddTransactionOutput,
  TransactionDto,
} from './dto';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class AddTransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly transactionPinService: TransactionPinService,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  async addTransaction(
    input: AddTransactionInput,
    userCon: UserPayload,
  ): Promise<AddTransactionOutput> {
    try {
      const { transactionType, receiverWalletId, amount } = input;
      let receiver: UserDocument = null;
      let receiverWallet: WalletDocument;

      if (amount === 0) {
        throw new BadRequestException(
          `You cannot make a transaction with an amount of 0`,
        );
      }

      const emitter = await this.userModel
        .findOne({ email: userCon.email })
        .exec();
      if (!emitter) {
        throw new NotFoundException(`User '${userCon.name}' not found`);
      }

      const emitterWallet = await this.walletModel
        .findOne({
          user: emitter._id,
        })
        .exec();
      if (!emitterWallet) {
        throw new NotFoundException(
          `The user '${emitter.name}' do not have a wallet`,
        );
      }

      if (transactionType === TransactionType.TRANSFERT && !receiverWalletId) {
        throw new BadRequestException(`Please provide the receiver's email`);
      }

      if (receiverWalletId) {
        receiverWallet = await this.walletModel
          .findById(receiverWalletId)
          .exec();
        if (!receiverWallet) {
          throw new NotFoundException(
            `Wallet with _id '${receiverWalletId}' not found`,
          );
        }

        receiver = await this.userModel.findById(receiverWallet.user).exec();
      } else if (transactionType === TransactionType.DEPOSIT) {
        receiver = emitter;
      }

      const transaction = new TransactionDto();

      transaction.type = transactionType;
      transaction.amount = amount;

      const pin = await this.transactionPinService.generate();
      transaction.pin = pin;
      transaction.date = new Date();

      if (transactionType === TransactionType.DEPOSIT) {
        transaction.mode = Mode.STRIPE_API;
        transaction.emitter = emitter;
        transaction.walletEmitter = emitterWallet;
        transaction.receiver = emitter;
        transaction.walletReceiver = emitterWallet;

        try {
          const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card'],
          });
        } catch (error) {
          console.log(error);

          throw new RequestTimeoutException(
            `The deposit has not been made. Try again`,
          );
        }

        emitterWallet.balance = emitterWallet.balance + amount;
      } else if (transactionType === TransactionType.TRANSFERT) {
        transaction.emitter = emitter;
        transaction.walletEmitter = emitterWallet;
        transaction.receiver = receiver;
        transaction.walletReceiver = receiverWallet;

        if (emitterWallet.balance < amount) {
          throw new BadRequestException(
            `Sorry, insufficient funds. Your current balance is: ${emitterWallet.balance}`,
          );
        }

        if (emitter.email === receiver.email) {
          throw new BadRequestException(
            'You cannot make a transfert to your own account',
          );
        }

        emitterWallet.balance = emitterWallet.balance - amount;
        receiverWallet.balance = receiverWallet.balance + amount;
      } else if (transactionType === TransactionType.WITHDRAWAL) {
        transaction.mode = Mode.MOBILE_MONEY_API;
        transaction.emitter = emitter;
        transaction.walletEmitter = emitterWallet;

        if (emitterWallet.balance < amount) {
          throw new BadRequestException(
            `Sorry, insufficient funds. Your current balance is ${emitterWallet.balance}`,
          );
        }

        emitterWallet.balance = emitterWallet.balance - amount;
      }

      const trans = new this.transactionModel(transaction);
      await trans.save();

      await emitterWallet.save();

      if (!!receiverWallet) {
        await receiverWallet.save();
      }

      return new AddTransactionOutput(
        trans,
        emitterWallet.balance,
        emitter,
        receiver,
      );
    } catch (error) {
      console.log(error);

      throw new ConflictException(
        `${AddTransactionService.name}`,
        error.response ? error.response : error,
      );
    }
  }
}
