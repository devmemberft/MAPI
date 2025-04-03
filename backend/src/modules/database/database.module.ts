import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Client } from "../clients/entities/client.entity";
import { Product } from "../products/entities/product.entity";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:'postgres',
            host:'localhost',
            port:5432,
            username:'devmemberft',
            password:'immanuelveins',
            database:'miselio',
            entities:[User,Product,Client], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
        })
    ],
    exports:[TypeOrmModule],
})
export class DataBaseModule{}