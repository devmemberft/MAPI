import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from './hash.service';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './strategies/local.strategy';


@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({secret: process.env.SECRET || 'secret', signOptions: { expiresIn: '15m'},}),
  ],
  providers: [UsersService, AuthService, BcryptService, LocalStrategy],
  controllers: [AuthController],
  exports: [BcryptService],
})
export class AuthModule {}
