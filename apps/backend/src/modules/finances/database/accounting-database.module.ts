import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../transactions/transaction.entity";
import { Tag } from "../tags/tag.entity";
import * as dotenv from 'dotenv'
import { User } from "../users/user.entity";
import { Account } from "../accounts/account.entity";
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
            entities:[Tag,Transaction,User,Account], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
        }),
        TypeOrmModule.forFeature([Tag,Transaction,User,Account],'accountingConnection'),
    ],
    exports:[TypeOrmModule],
})
export class AccountingDataBaseModule{}