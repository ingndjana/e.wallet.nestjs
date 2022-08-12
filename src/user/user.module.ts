import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtStrategy, LocalStrategy } from 'src/strategies';
import { AddUserController } from './add-user/add-user.controller';
import { AddUserService } from './add-user/add-user.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: process.env.EXPIRED_IN },
    }),
  ],
  controllers: [AddUserController, LoginController],
  providers: [
    AddUserService,
    LoginService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UserModule {}
