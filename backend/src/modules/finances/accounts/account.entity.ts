import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "../transactions/transaction.entity";

export enum accountType {
    ASSET = 'asset',
    RESPONSIBILITY = 'responsibility',
    EQUITY = 'equity',
    INCOME = 'income',
    EXPENSE = 'expense'
}

export enum accountState {
    BALANCE = 'balance',
    INCOME_STATEMENT = 'income_statement',

}

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    account_id:string;

    
    @Column({type:'enum', enum:accountType})
    account_type: accountType;
    
    @Column({type:'enum', enum:accountState})
    account_state: accountState;
    
    @Column()
    account_name:string; // depende del tipo y del estado "caja", "banco", "personal", "empresa1"
    
    @OneToMany(() => Transaction, (t) => t.account)
    transactions: Transaction[];
}