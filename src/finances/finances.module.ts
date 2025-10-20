import { Module } from '@nestjs/common';
import { AccountingDataBaseModule } from './database/accounting-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TransactionModule } from './transactions/transaction.module';
import { TagModule } from './tags/tag.module';
import { AccountModule } from './accounts/account.module';
import { KeyAuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { Transaction } from './transactions/transaction.entity';
import { Tag } from './tags/tag.entity';
import { Account } from './accounts/account.entity';
import { UserService } from './users/user.service';

@Module({
  imports:[AccountingDataBaseModule, TypeOrmModule.forFeature([User,Transaction,Tag,Account],'accountingconnection'), UserModule, TransactionModule, TagModule, AccountModule, KeyAuthModule],
  exports:[UserModule, TransactionModule, TagModule, AccountModule, KeyAuthModule, TypeOrmModule],
  providers:[UserService],
})
export class FinancesModule {}
