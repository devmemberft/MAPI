import { Sale } from "src/modules/sales/entities/sale.entity";
import { PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @Column({type:'numeric', default: 0})
    payment_amount:number; // se actualiza si se realiza el pago

    @Column({type:'boolean', default:false})
    payment_made:boolean;

    @Column({type:'text',nullable:true})
    observation?:string;

    @Column({ type:'date'})
    payment_date:Date;
    
    @CreateDateColumn({type:'timestamp', name:'created_at'}) // dia que se realizo el pago
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'}) // dia que se realizo el pago
    updatedAt:Date;

    // Relacion: muchos pagos pertenecen a una sola venta (n:1)
    @ManyToOne(() => Sale, sale => sale.payments)
    sale:Sale;

}