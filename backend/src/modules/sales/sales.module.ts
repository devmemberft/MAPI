import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity'
import {DataBaseModule} from '../database/database.module'
import { Client } from '../clients/entities/client.entity';
import { Product } from '../products/entities/product.entity';
import { Payment } from '../payments/entities/payment.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[DataBaseModule,TypeOrmModule.forFeature([Sale, Client, Product, Payment, User])],
  providers: [SalesService],
  controllers: [SalesController]
})
export class SalesModule {}
