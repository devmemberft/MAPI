import { Sale } from "src/modules/sales/entities/sale.entity";
import { PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, Column, Entity, ManyToOne } from "typeorm"

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    payment_id: string;

    @Column({type:'numeric', precision:10, scale:2, default: 0}) // consultar precision y scale
    payment_amount:number; // se actualiza si se realiza el pago

    /*@Column({type:'boolean', default:false})
    is_paid:boolean; // Valor derivado, puede suprimirse y consultarse con logica derivada o vista sql payment_made = payment_amount > 0;
    */
    @Column({type:'text',nullable:true})
    observation?:string;

    @CreateDateColumn({type:'timestamp', name:'created_at'}) // dia que se realizo el primer pago
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'}) // dia que se actualizo el pago
    updatedAt:Date;

    // Relacion: muchos pagos pertenecen a una sola venta (n:1)
    @ManyToOne(() => Sale, sale => sale.payments)
    sale:Sale;

}