import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../transactions/transaction.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id:string;

    @Column({nullable:true})
    user_nickname:string;

    @Column({unique:true})
    user_secret_key_hashed:string;

    @Column({nullable:true})
    user_role:string;

    @CreateDateColumn({type:'timestamp'})
    createdAt:Date;

    @OneToMany(()=> Transaction, (t)=> t.user)
    transactions: Transaction[];
}