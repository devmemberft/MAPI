import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column} from 'typeorm'

@Entity()
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    username:string;

    @Column()
    dni:number;

    @Column()
    address:string;

    @Column()
    phone:string;

    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'update_at'})
    updatedAt:Date;
}