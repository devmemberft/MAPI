import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../categories/category.entity";
import { Account } from "../accounts/account.entity";
import { User } from "../users/user.entity";

export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    transaction_id:string;

    @Column({type:'numeric'}) // 'decimal', {precision:12, scale:2}
    transaction_amount:number;

    @Column({type:'enum', enum:TransactionType})
    transaction_type: TransactionType;

    @Column({nullable:true})
    transaction_description: string;

    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;

    @ManyToOne(() => Account, (account) => account.transactions)
    @JoinColumn({name:'account_id'})
    account: Account;

    @ManyToOne(() => Category, category => category.transactions, {eager:true, nullable:true})
    @JoinColumn({name:'category_id'})
    category: Category;

    @ManyToOne(() => User, (user) => user.transactions)
    @JoinColumn({name: 'user_id'})
    user: User;
}