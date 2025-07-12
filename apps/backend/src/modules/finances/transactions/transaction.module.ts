import { forwardRef, Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Transaction } from "./transaction.entity";
import { Category } from "../categories/category.entity";
import { Account } from "../accounts/account.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([Transaction])],
  exports:[TypeOrmModule],
  controllers:[TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}