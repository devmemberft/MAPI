import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity'
import {CompanyDataBaseModule} from '../database/company-database.module'
import { Client } from '../clients/entities/client.entity';
import { Product } from '../products/entities/product.entity';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';

@Module({
  imports:[CompanyDataBaseModule,TypeOrmModule.forFeature([Sale, Client, Product, Payment, User])],
  providers: [SalesService, ClientsService, ProductsService],
  controllers: [SalesController]
})
export class SalesModule {}
