import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { FullImportStrategy } from './strategies/full-import.strategy';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { DataBaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../payments/entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { ProductsService } from '../products/products.service';
import { SalesService } from '../sales/sales.service';
import { PaymentsService } from '../payments/payments.service';

@Module({
  imports:[DataBaseModule,TypeOrmModule.forFeature([Payment, Sale, User, Client, Product])],
  controllers: [ImportController],
  providers: [ImportService,FullImportStrategy, ClientsService, ProductsService, SalesService, PaymentsService],
})
export class ImportModule {}
