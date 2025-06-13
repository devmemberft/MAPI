import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../entities/transaction.entity";
import { Category } from "../entities/category.entity";
import * as dotenv from 'dotenv'
dotenv.config();
// base de datos de prueba
@Module({
    imports:[
        TypeOrmModule.forRoot({
            name:'accountingConnection',
            type:'postgres',
            host:process.env.DB_HOST,
            port:5432,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_ACCOUNTING_NAME,
            entities:[Category,Transaction], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
        }),
        TypeOrmModule.forFeature([Category,Transaction],'accountingConnection'),
    ],
    exports:[TypeOrmModule],
})
export class AccountingDataBaseModule{}