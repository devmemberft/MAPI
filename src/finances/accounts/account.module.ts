import { Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Transaction } from "typeorm";
import { Account } from "./account.entity";
import { AccountController } from "./accounts.controller";
import { AccountService } from "./account.service";
import { TransactionModule } from "../transactions/transaction.module";
import { Tag } from "../tags/tag.entity";

@Module({
  imports:[AccountingDataBaseModule, TypeOrmModule.forFeature([Account, User], 'accountingconnection'), TransactionModule],
  exports:[AccountService],
  controllers:[AccountController],
  providers: [AccountService]
})
export class AccountModule {}