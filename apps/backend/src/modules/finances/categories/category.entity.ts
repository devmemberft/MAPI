import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "../transactions/transaction.entity";
import { Account } from "../accounts/account.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    category_id:string;

    @Column({unique:true})
    category_name:string;

    @Column({nullable:true})
    category_description?: string;

    @ManyToOne(()=> Account, (account)=> account.account_id)
    @JoinColumn({name: 'account_id'})
    account: Account;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];
}