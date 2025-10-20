import { Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";


import { Tag } from "./tag.entity";

import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";
import { User } from "../users/user.entity";
import { Transaction } from "../transactions/transaction.entity";
import { Account } from "../accounts/account.entity";


@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([Tag,Transaction,Account, User], 'accountingconnection')],
  controllers:[TagController],
  providers: [TagService],
  exports:[TagService,TypeOrmModule],
})
export class TagModule {}