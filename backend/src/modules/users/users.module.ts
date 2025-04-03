import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from '../auth/hash.service';
import { DataBaseModule } from '../database/database.module';

@Module({
  imports:[DataBaseModule,TypeOrmModule.forFeature([User])],
  controllers:[UsersController],
  providers: [UsersService, BcryptService]
})
export class UsersModule {}
