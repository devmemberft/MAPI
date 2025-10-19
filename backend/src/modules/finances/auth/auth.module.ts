import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { User } from '../users/user.entity'
import { UserService } from '../users/user.service'
import { KeyAuthService } from './auth.service'
import { KeyAuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { BcryptService } from '../../auth/hash.service'
import { JwtStrategy } from '../../auth/strategies/jwt.strategy'
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'
import { UserModule } from '../users/user.module'
import { PassportModule } from '@nestjs/passport'
import { UserController } from '../users/user.controller'
import { AccountingDataBaseModule } from '../database/accounting-database.module'
dotenv.config()

@Module({
  imports:[
    AccountingDataBaseModule,
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({secret:process.env.JWT_SECRET, signOptions: { expiresIn:'15min'},}),
  ],
  providers: [UserService, KeyAuthService, BcryptService, JwtStrategy, JwtAuthGuard],
  controllers: [KeyAuthController,UserController],
  exports: [KeyAuthModule],
})
export class KeyAuthModule {}
