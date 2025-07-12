import { Module } from "@nestjs/common";
import { AccountingDataBaseModule } from "../database/accounting-database.module";
import { TypeOrmModule } from "@nestjs/typeorm";


import { Category } from "./category.entity";

import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";


@Module({
  imports:[AccountingDataBaseModule,TypeOrmModule.forFeature([Category])],
  controllers:[CategoryController],
  providers: [CategoryService],
  exports:[CategoryService,TypeOrmModule],
})
export class CategoryModule {}