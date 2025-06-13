import { Module } from '@nestjs/common';
import { AccountingService } from './service/accounting.service';
import { AccountingController } from './controller/accounting.controller';
import { AccountingDataBaseModule } from './database/accounting-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';

@Module({
  imports:[TypeOrmModule,AccountingDataBaseModule],
  providers: [AccountingService,CategoryService],
  controllers: [AccountingController,CategoryController]
})
export class AccountingModule {}
