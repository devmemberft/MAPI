import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/company/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDataBaseModule } from './modules/company/database/company-database.module';
import { SalesModule } from './modules/company/sales/sales.module'
import { PaymentsModule } from './modules/company/payments/payments.module'
import { ProductsModule } from './modules/company/products/products.module'
import { ClientsModule } from './modules/company/clients/clients.module'
import { ImportModule } from './modules/company/import/import.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { AccountingDataBaseModule } from './modules/accounting/database/accounting-database.module';

@Module({
  imports: [TypeOrmModule, CompanyDataBaseModule, AccountingDataBaseModule, UsersModule, AuthModule, SalesModule, PaymentsModule, ProductsModule, ClientsModule, ImportModule, AccountingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
