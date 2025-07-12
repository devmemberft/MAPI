import { Module } from '@nestjs/common';
import { AccountingDataBaseModule } from './database/accounting-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { TransactionModule } from './transactions/transaction.module';
import { CategoryModule } from './categories/category.module';
import { AccountModule } from './accounts/account.module';
import { KeyAuthModule } from './auth/auth.module';

@Module({
  imports:[TypeOrmModule,AccountingDataBaseModule,UserModule,TransactionModule,CategoryModule,AccountModule, KeyAuthModule],
  exports:[UserModule,TransactionModule,CategoryModule,AccountModule, KeyAuthModule],
})
export class FinancesModule {}
