import { Sale } from "src/modules/sales/entities/sale.entity";
import { PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @Column()
    sale_id:string; // relacion a tabla de ventas
 
    @Column({type:'numeric'})
    payment_amount:number; // valor del pago realizado
    
    @CreateDateColumn({type:'timestamp', name:'first_payment_date'}) // dia que se realizo el pago
    first_payment_date:Date;

    @UpdateDateColumn({type:'timestamp', name:'last_payment_date', nullable:true}) // dia que se actualizó la informacion del pago
    last_payment_date?:Date;

    // Relacion: muchos pagos pertenecen a una sola venta (n:1)
    @ManyToOne(() => Sale, sale => sale.payments)
    sale:Sale;

}