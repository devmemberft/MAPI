import { Client } from "src/modules/clients/entities/client.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, Entity, ManyToOne, ManyToMany, OneToMany } from "typeorm"

@Entity()
export class Sale {
    @PrimaryGeneratedColumn('uuid')
    sale_id: string;

    @Column({type:'numeric'})
    sign:number; // pago para recibir el producto

    @Column({type:'enum', enum:['diario','semanal', 'quincenal', 'mensual']})
    payment_frecuency:'diario'|'semanal'|'quincenal'|'mensual'; // diario(1) semanal(7) quincenal(15) mensual(30) dia?(lunes,martes...)

    @Column({type:'enum', enum:['lunes','martes','miercoles','jueves','viernes','sabado','domingo'], nullable:true})
    payment_day:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'|'sabado'|'domingo';

    @Column()
    number_of_payments?:number; //valor derivado(debe ser calculado y no guardado directamente): cuantos pagos a realizado
    
    @Column({type:'numeric'})
    quota_value:number; // por ejemplo, 500 pesos cada semana

    @Column({type:'numeric'})
    balance_amount?:number; //valor derivado(debe ser calculado y no guardado directamente): resta entre (precio del producto menos la seña) y (sumatoria de los pagos realizados)

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

    // Relacion: muchas ventas pueden tener muchos productos (n:m)
    @ManyToMany(() => Product, product => product.sales)
    products:Product[];

    // Relacion: una venta puede tener muchos pagos (1:n) 
    @OneToMany(() => Payment, payment => payment.sale)
    payments:Payment[];

}