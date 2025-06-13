import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../company/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from './hash.service';
import { User } from '../company/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../company/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import * as dotenv from 'dotenv'
dotenv.config()

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({secret:process.env.JWT_SECRET, signOptions: { expiresIn:process.env.JWT_EXPIRATION},}),
  ],
  providers: [UsersService, AuthService, BcryptService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [BcryptService],
})
export class AuthModule {}
