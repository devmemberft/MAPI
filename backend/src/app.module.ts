import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseModule } from './modules/database/database.module';
import { SalesModule } from './modules/sales/sales.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { ProductsModule } from './modules/products/products.module'
import { ClientsModule } from './modules/clients/clients.module'
import { ImportModule } from './modules/import/import.module';

@Module({
  imports: [TypeOrmModule, DataBaseModule, UsersModule, AuthModule, SalesModule, PaymentsModule, ProductsModule, ClientsModule, ImportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
