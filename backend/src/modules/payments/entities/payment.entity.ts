import { Sale } from "src/modules/sales/entities/sale.entity";
import { PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @Column({type:'numeric'})
    payment_amount:number; // valor del pago realizado
    
    @CreateDateColumn({type:'timestamp', name:'created_at'}) // dia que se realizo el pago
    payment_date:Date;

    // Relacion: muchos pagos pertenecen a una sola venta (n:1)
    @ManyToOne(() => Sale, sale => sale.payments)
    sale:Sale;

}