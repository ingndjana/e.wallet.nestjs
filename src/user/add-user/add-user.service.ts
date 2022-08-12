import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { AddUserInput, AddUserOutput, UserDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AddUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(input: AddUserInput): Promise<AddUserOutput> {
    try {
      const { name, email, password } = input;
      const salt = await bcrypt.genSalt();
      const hashingPwd = await bcrypt.hash(password, salt);

      const userDto = new UserDto();
      userDto.name = name;
      userDto.email = email;
      userDto.password = hashingPwd;
      userDto.salt = salt;

      const user = new this.userModel(userDto);
      await user.save();

      return new AddUserOutput(user);
    } catch (error) {
      throw new ConflictException(`${AddUserService.name}`, error);
    }
  }
}
