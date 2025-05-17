import { Sale } from 'src/modules/sales/entities/sale.entity';
export declare class Client {
    client_id: string;
    client_dni: string;
    client_name: string;
    client_address: string;
    client_phone: string;
    client_rute: string;
    client_zone: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    sales: Sale[];
}
