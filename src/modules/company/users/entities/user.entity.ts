import { Entity, Unique, Index, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column} from 'typeorm'

@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn('uuid')
    user_id:string;

    @Index()
    @Column()
    username:string;

    @Column()
    email:string;

    @Column({select:false})
    password:string;

    @Column({type:'enum', enum:['admin', 'user', 'mod'], default:'user'})
    role:'user'|'admin'|'mod';
    
    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;
    
    @UpdateDateColumn({type:'timestamp', name:'updated_at'})
    updateAt:Date;
    
    @DeleteDateColumn({type:'timestamp', name:'deleted_at', nullable:true})
    deletedAt?:Date;
}