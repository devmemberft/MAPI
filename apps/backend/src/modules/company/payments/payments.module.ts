import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity'
import {CompanyDataBaseModule} from '../database/company-database.module'
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { SalesService } from '../sales/sales.service';
import { Client } from '../clients/entities/client.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports:[CompanyDataBaseModule,TypeOrmModule.forFeature([Payment, Sale, User, Client, Product])],
  controllers: [PaymentsController],
  providers: [PaymentsService, ClientsService, ProductsService, SalesService]
})
export class PaymentsModule {}
