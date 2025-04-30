import { Client } from "src/modules/clients/entities/client.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { Product } from "src/modules/products/entities/product.entity";
export declare class Sale {
    sale_id: string;
    sign: number;
    payment_frecuency: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    payment_day: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    number_of_payments?: number;
    quota_value: number;
    balance_amount?: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    client: Client;
    products: Product[];
    payments: Payment[];
}
