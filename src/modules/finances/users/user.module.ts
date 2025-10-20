import { Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Transaction } from "../transactions/transaction.entity";
import { Tag } from "../tags/tag.entity";
import { Account } from "../accounts/account.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BcryptService } from "../../auth/hash.service";

@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([User,Transaction,Tag,Account],'accountingconnection')],
  exports:[TypeOrmModule, UserService],
  controllers:[UserController],
  providers: [UserService, BcryptService]
})
export class UserModule {}