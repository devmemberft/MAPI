import { Sale } from "src/modules/sales/entities/sale.entity";
export declare class Payment {
    payment_id: string;
    sale_id: string;
    payment_amount: number;
    first_payment_date: Date;
    last_payment_date?: Date;
    sale: Sale;
}
