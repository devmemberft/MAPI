import { Sale } from "src/modules/sales/entities/sale.entity";
import { PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity, JoinTable, OneToMany } from "typeorm"
import { ProductCategoryEnum } from "../enums/product-category.enum";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    product_id: string;

    @Column()
    product_name:string;

    @Column({type:'numeric'})
    product_price:number;

    @Column({type:'enum', enum:ProductCategoryEnum})
    product_category:ProductCategoryEnum;

    /*@Column()
    product_stock:number;*/

    @CreateDateColumn({type:'timestamp', name:'created_at'}) // dia que se registro el producto
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'}) // dia que se actualizó la informacion del producto
    updatedAt:Date;

    @DeleteDateColumn({type:'timestamp', name:'deleted_at', nullable:true})
    deletedAt:Date;

    // Relacion: muchas ventas pueden tener un producto
    @OneToMany(()=> Sale, sale => sale.product)
    sales:Sale[]; 
}