import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayload } from '../../interfaces';
import { User, UserDocument } from '../../schemas/user.schema';
import { LoginCredentialsInput } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(credentials: LoginCredentialsInput): Promise<UserPayload> {
    try {
      const { email, inputPassword } = credentials;
      const user = await this.userModel.findOne({ email: email });

      if (!user) {
        throw new NotFoundException('Invalid email or password');
      }

      const isMatch = await bcrypt.compare(inputPassword, user.password);

      if (!isMatch) {
        throw new NotFoundException('Invalid email or password');
      }

      const payload: UserPayload = {
        name: user.name,
        email: user.email,
      };

      return payload;
    } catch (error) {
      throw new NotFoundException(`${LoginService.name}`, error.response);
    }
  }
}
