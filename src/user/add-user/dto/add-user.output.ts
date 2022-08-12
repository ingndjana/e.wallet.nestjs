import { User, UserDocument } from 'src/schemas/user.schema';

export class AddUserOutput {
  constructor(user: UserDocument) {
    this.id = user._id;
    this.name = user.name;
    this.email = user.email;
  }

  id: string;
  name: string;
  email: string;
}
