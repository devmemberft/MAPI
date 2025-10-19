import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./client.entity";
import { Service } from "./service.entity";

export enum AppointmentStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLLED',
    COMPLETED = 'COMPLETED'
}

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    appointment_id:string;

    @Column({type:'enum',enum:AppointmentStatus, default:AppointmentStatus.PENDING})
    appointment_status: AppointmentStatus;

    @Column({ nullable:true})
    notes?:string;

    @Column({type: 'timestamp'})
    scheduled_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Client, client => client.appointments, {eager:true})
    client:Client;

    @ManyToOne(() => Service, {eager:true})
    service:Service;
}