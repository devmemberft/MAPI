import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity'
import {DataBaseModule} from '../database/database.module'
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Client } from '../clients/entities/client.entity';
import { Payment } from '../payments/entities/payment.entity';


@Module({
  imports:[DataBaseModule,TypeOrmModule.forFeature([Product, Sale, User, Client, Payment])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
