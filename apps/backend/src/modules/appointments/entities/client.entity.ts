import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointment.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    client_id:string;

    @Column()
    client_name:string;

    @Column({unique:true})
    client_phone_number:string;

    @OneToMany(() => Appointment, appointment => appointment.client)
    appointments: Appointment[];
}