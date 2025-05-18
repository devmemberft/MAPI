import { Client } from "src/modules/clients/entities/client.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { SaleMethodEnum } from "../enums/sale-method.enum";
export declare class Sale {
    sale_id: string;
    seller: string;
    sale_method: SaleMethodEnum;
    total_sale: number;
    total_number_of_payments: number;
    quota_value: number;
    sign: number;
    number_of_payments: number;
    balance_amount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    client: Client;
    product: Product | null;
    payments: Payment[];
}
