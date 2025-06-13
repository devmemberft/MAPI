import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity'
import {CompanyDataBaseModule} from '../database/company-database.module'
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { Payment } from '../payments/entities/payment.entity';

@Module({
    imports:[CompanyDataBaseModule,TypeOrmModule.forFeature([Client, Sale, User, Product, Payment])],
    controllers:[ClientsController],
    providers:[ClientsService],
})
export class ClientsModule {}
