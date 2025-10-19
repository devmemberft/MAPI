import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "../transactions/transaction.entity";

@Entity('tags')
export class Tag {

    @PrimaryGeneratedColumn('uuid')
    tag_id:string;

    @Column({unique:true})
    tag_name:string;
    
    @ManyToMany(() => Transaction, transaction => transaction.tags)
    transactions: Transaction[];
}

/* 
@ManyToOne(()=> Account, (account)=> account.account_id)
@JoinColumn({name: 'account_id'})
account: Account;
*/