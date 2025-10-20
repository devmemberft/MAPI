import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeyAuthModule } from './finances/auth/auth.module';
import { FinancesModule } from './finances/finances.module';
import { AccountingDataBaseModule } from './finances/database/accounting-database.module';
import { UserService } from './finances/users/user.service';
import { TransactionService } from './finances/transactions/transaction.service';
import { TagService } from './finances/tags/tag.service';
import { AccountService } from './finances/accounts/account.service';

@Module({
  imports: [AccountingDataBaseModule, KeyAuthModule, FinancesModule],
  controllers: [AppController],
  providers: [AppService, UserService, TransactionService, TagService, AccountService],
})
export class AppModule {}
