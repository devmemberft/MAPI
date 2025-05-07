import { Sale } from "src/modules/sales/entities/sale.entity";
export declare class Payment {
    payment_id: string;
    payment_amount: number;
    observation?: string;
    createdAt: Date;
    updatedAt: Date;
    sale: Sale;
}
