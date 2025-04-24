import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity'
import {DataBaseModule} from '../database/database.module'
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports:[DataBaseModule,TypeOrmModule.forFeature([Payment, Sale, User])],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
