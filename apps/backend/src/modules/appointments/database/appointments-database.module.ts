import { Module } from "@nestjs/common"; 
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv'
import { Appointment } from "../entities/appointment.entity";
import { Client } from "../entities/client.entity";
import { Service } from "../entities/service.entity";
dotenv.config();
// base de datos de prueba
@Module({
    imports:[
        TypeOrmModule.forRoot({
            name:'appointmentConnection',
            type:'postgres',
            host:process.env.DB_HOST,
            port:5432,
            username:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_APPOINTMENTS_NAME,
            entities:[Appointment,Client, Service], //cada una de las entidades de la base de datos
            synchronize: true, // false in production
            retryAttempts: 2,
            retryDelay: 1000,
        }),
        TypeOrmModule.forFeature([Appointment,Client, Service],'appointmentConnection'),
    ],
    exports:[TypeOrmModule],
})
export class AppointmentDataBaseModule{}