import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Service {
    @PrimaryGeneratedColumn('uuid')
    service_id:string;

    @Column()
    service_name:string;

    @Column({type:'numeric'})
    service_duration:number;
}