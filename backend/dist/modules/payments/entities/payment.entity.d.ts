import { Sale } from "src/modules/sales/entities/sale.entity";
export declare class Payment {
    payment_id: string;
    payment_amount: number;
    observation?: string;
    payment_date: Date;
    createdAt: Date;
    updatedAt: Date;
    sale: Sale;
}
