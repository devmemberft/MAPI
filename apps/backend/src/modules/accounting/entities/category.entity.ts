import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Transaction } from "./transaction.entity";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    category_id:string;

    @Column({unique:true})
    category_name:string;

    @Column({nullable:true})
    category_description?: string;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];
}