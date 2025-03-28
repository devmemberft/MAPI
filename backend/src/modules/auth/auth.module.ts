import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from './hash.service';


@Module({
  imports:[
    UsersModule,
    PassportModule,
    JwtModule.register({secret: process.env.SECRET, signOptions: { expiresIn: '15m'},}),
  ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController],
  exports: [BcryptService],
})
export class AuthModule {}
