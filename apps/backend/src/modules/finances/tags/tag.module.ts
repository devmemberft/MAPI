import { Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";


import { Tag } from "./tag.entity";

import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";


@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([Tag])],
  controllers:[TagController],
  providers: [TagService],
  exports:[TagService,TypeOrmModule],
})
export class TagModule {}