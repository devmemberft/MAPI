import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Client } from "../clients/entities/client.entity";
import { Product } from "../products/entities/product.entity";
import { Payment } from "../payments/entities/payment.entity";
import { Sale } from "../sales/entities/sale.entity";
import * as dotenv from 'dotenv'
dotenv.config();
// base de datos de prueba
@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:'postgres',
            host:process.env.DB_HOST,
            port:5432,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_NAME,
            entities:[User,Product,Client,Sale,Payment], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
        })
    ],
    exports:[TypeOrmModule],
})
export class DataBaseModule{}