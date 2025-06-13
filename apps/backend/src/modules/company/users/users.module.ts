import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from '../../auth/hash.service';
import { CompanyDataBaseModule } from '../database/company-database.module';
import { Client } from '../clients/entities/client.entity';
import { Product } from '../products/entities/product.entity';
import { Sale } from '../sales/entities/sale.entity';
import { Payment } from '../payments/entities/payment.entity';

@Module({
  imports:[CompanyDataBaseModule,TypeOrmModule.forFeature([User, Client, Product, Sale, Payment])],
  controllers:[UsersController],
  providers: [UsersService, BcryptService]
})
export class UsersModule {}
