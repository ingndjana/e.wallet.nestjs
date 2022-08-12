import { User } from 'src/schemas/user.schema';

export class WalletDto {
  balance: number;
  pin: number;
  user: User;
}
