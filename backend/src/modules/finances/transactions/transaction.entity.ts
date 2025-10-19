import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "../tags/tag.entity";
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

    @Column({type:'decimal',precision:12, scale:2}) // 'decimal', {precision:12, scale:2}
    transaction_amount:number;

    @Column({type:'enum', enum:TransactionType})
    transaction_type: TransactionType;

    @Column({nullable:true})
    transaction_description: string;

    @CreateDateColumn({type:'timestamp', name:'created_at'})
    createdAt:Date;

    @ManyToOne(() => Account, (account) => account.transactions, {nullable:true, onDelete: 'SET NULL'}) // puede ser vacio y al ser eliminada borra la relacion y no la transaccion
    @JoinColumn({name:'account_id'})
    account: Account;

    @ManyToMany(() => Tag, tag => tag.transactions, {eager:true, nullable:true, cascade:true})
    @JoinTable()
    tags: Tag[];

    @ManyToOne(() => User, (user) => user.transactions, {onDelete:'CASCADE',})
    @JoinColumn({name: 'user_id'})
    user: User;
}