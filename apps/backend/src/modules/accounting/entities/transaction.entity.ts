import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

export enum TransactionType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    transaction_id:string;

    @Column({type:'numeric'})
    transaction_amount:number;

    @Column({type:'enum', enum:TransactionType})
    transaction_type: TransactionType;

    @Column()
    transaction_description: string;

    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;

    @ManyToOne(() => Category, category => category.transactions, {eager:true, nullable:true})
    @JoinColumn({name:'category_id'})
    category: Category;
}