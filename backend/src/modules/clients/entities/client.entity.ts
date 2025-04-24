import { Sale } from 'src/modules/sales/entities/sale.entity';
import { Entity, Index, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, OneToMany } from 'typeorm'

@Entity()
@Unique(['client_dni'])
export class Client {

    @PrimaryGeneratedColumn('uuid')
    client_id:string;

    @Column()
    client_dni:number;

    @Column()
    client_name:string;

    @Column()
    client_lastname:string;

    @Column()
    client_phone:number;

    @Column()
    client_address:string;

    @Index()
    @Column()
    client_zone: number; // sujeta a normalizacion

    @CreateDateColumn({type:'timestamp', name:'created_at'}) // fecha registro del cliente
    createdAt:Date;

    @UpdateDateColumn({type:'timestamp', name:'updated_at'}) // fecha de actualizacion de informacion cliente
    updatedAt:Date;

    @DeleteDateColumn({type:'timestamp', name:'deleted_at', nullable:true})
    deletedAt?:Date;

    // Relacion: un cliente tiene muchas ventas (1:n)
    @OneToMany(() => Sale, sale => sale.client)
    sales: Sale[]; 
}