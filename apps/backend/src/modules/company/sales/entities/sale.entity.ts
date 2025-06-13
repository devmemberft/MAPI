import { Client } from "src/modules/company/clients/entities/client.entity";
import { Payment } from "src/modules/company/payments/entities/payment.entity";
import { Product } from "src/modules/company/products/entities/product.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity, ManyToOne, ManyToMany, OneToMany, JoinTable } from "typeorm"
import { PaymentFrecuencyEnum } from "../enums/payment-frecuency.enum";
import { PaymentDayEnum } from "../enums/payment-day.enum";
import { SaleMethodEnum } from "../enums/sale-method.enum";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    sale_id: string;

    @Column()
    sale_date:Date;

    @Column()
    seller:string;

    @Column({type:'enum', enum:SaleMethodEnum})
    sale_method:SaleMethodEnum;

    @Column({type:'numeric'})
    total_sale:number; // product_price * 
    
    @Column({default:2})
    total_number_of_payments:number; // total cuotas
    
    @Column({type:'numeric'})
    quota_value:number; 
    
    @Column({type:'enum', enum:PaymentDayEnum, nullable:true})
    payment_day:PaymentDayEnum;
    
    /*
    @Column({type:'enum', enum:PaymentFrecuencyEnum})
    payment_frecuency:PaymentFrecuencyEnum; // diario(1) semanal(7) quincenal(15) mensual(30) dia? (lunes,martes...)
    */
    @Column({type:'numeric'})
    sign:number; // equivalente al pago inicial en la entidad de producto

    @Column({default:1})
    number_of_payments:number; //valor derivado(debe ser calculado y no guardado directamente): cuantos pagos a realizado
    //valor derivado donde se compara number of payments con total number of payments, cuando llegue a 0 se cierra la venta, o cuando el balance llegue a 0
 
    @Column({type:'numeric'})
    balance_amount:number; //valor derivado(debe ser calculado y no guardado directamente): resta entre (precio del producto menos la seña) y (sumatoria de los pagos realizados)
    
    //  Tip: si luego necesito usarlos mucho, podría generarlos con Columnas Virtuales o Vistas Materializadas.
    @CreateDateColumn({type:'timestamp', name:'created_at'}) // dia que se realizo la venta
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'}) // dia que se actualizó la informacion de la venta
    updatedAt:Date;

    @DeleteDateColumn({type:'timestamp', name:'deleted_at', nullable:true})
    deletedAt?:Date;

    // Relacion: muchas ventas pueden pertenecer a un solo cliente (n:1)
    @ManyToOne(() => Client, client => client.sales)
    client:Client;

    // Relacion: muchas ventas pueden tener un producto (n:1) 
    @ManyToOne(() => Product, product => product.sales,{nullable:true})
    @JoinTable()
    product:Product|null;

    // Relacion: una venta puede tener muchos pagos (1:n) 
    @OneToMany(() => Payment, payment => payment.sale)
    @JoinTable()
    payments:Payment[];

}