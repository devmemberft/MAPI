import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type:'postgres',
            host:'localhost',
            port:5432,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:'miselio',
            entities:[], //cada una de las entidades de la base de datos
            synchronize: true // false in production
        })
    ],
    exports:[TypeOrmModule],
})
export class DataBaseModule{}