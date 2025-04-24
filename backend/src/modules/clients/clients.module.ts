import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity'
import {DataBaseModule} from '../database/database.module'
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports:[DataBaseModule,TypeOrmModule.forFeature([Client, Sale, User])],
    controllers:[ClientsController],
    providers:[ClientsService],
})
export class ClientsModule {}
