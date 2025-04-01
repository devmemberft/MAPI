import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    product_name:string;

    @Column()
    category:string;

    @Column()
    amount:number;

    @Column()
    color:string;
}