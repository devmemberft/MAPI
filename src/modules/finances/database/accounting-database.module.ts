import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../transactions/transaction.entity";
import { Tag } from "../tags/tag.entity";
import * as dotenv from 'dotenv'
import { User } from "../users/user.entity";
import { Account } from "../accounts/account.entity";
dotenv.config();
@Module({
    imports:[
        TypeOrmModule.forRoot({
            name:'accountingConnection',
            type:'postgres',
            host:'postgres',
            port: 5432,
            username: 'devmemberft01',
            password: 'postgrespassword',
            database: 'accountingConnection',
            entities:[Tag,Transaction,User,Account], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized:false} : false,
        }),
        TypeOrmModule.forFeature([Tag,Transaction,User,Account],'accountingConnection'),
    ],
    exports:[TypeOrmModule],
})
export class AccountingDataBaseModule{}