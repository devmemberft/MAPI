import { Module } from '@nestjs/common';
import { AccountingDataBaseModule } from './database/accounting-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TransactionModule } from './transactions/transaction.module';
import { TagModule } from './tags/tag.module';
import { AccountModule } from './accounts/account.module';
import { KeyAuthModule } from './auth/auth.module';

@Module({
  imports:[TypeOrmModule,AccountingDataBaseModule,UserModule,TransactionModule,TagModule,AccountModule, KeyAuthModule],
  exports:[UserModule,TransactionModule,TagModule,AccountModule, KeyAuthModule],
})
export class FinancesModule {}
