import { Sale } from 'src/modules/company/sales/entities/sale.entity';
import { Entity, Index, Unique, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Column, OneToMany, JoinTable } from 'typeorm'

@Entity()
@Unique(['client_dni'])
export class Client {

    @PrimaryGeneratedColumn('uuid')
    client_id:string;

    @Column({type:'varchar',length:22})
    client_dni:string;

    @Column()
    client_name:string;

    @Index()
    @Column()
    client_address:string;
    
    @Column({type:'varchar', length:22})
    client_phone:string;

    @Column()
    client_rute:string;

    @Index()
    @Column()
    client_zone: string; // sujeta a normalizacion

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