import { forwardRef, Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/user.entity";
import { Transaction } from "typeorm";
import { Category } from "../categories/category.entity";
import { Account } from "./account.entity";
import { AccountController } from "./accounts.controller";
import { AccountService } from "./account.service";
import { TransactionModule } from "../transactions/transaction.module";

@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([Account])],
  exports:[AccountService,TypeOrmModule],
  controllers:[AccountController],
  providers: [AccountService]
})
export class AccountModule {}