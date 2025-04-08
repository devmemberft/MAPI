import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column} from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    username:string;

    @Column()
    email:string;

    @Column()
    password:string;

    
    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;
    
    @UpdateDateColumn({type:'timestamp', name:'update_at'})
    updateAt:Date;
    
    @Column()
    role:string;
}