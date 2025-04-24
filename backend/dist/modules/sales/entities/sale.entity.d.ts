import { Client } from "src/modules/clients/entities/client.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { Product } from "src/modules/products/entities/product.entity";
export declare class Sale {
    sale_id: string;
    client_id: string;
    product_id: string;
    sign: number;
    payment_frecuency: string;
    number_of_payments: number;
    quota_value: number;
    balance_amount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    client: Client;
    products: Product[];
    payments: Payment[];
}
