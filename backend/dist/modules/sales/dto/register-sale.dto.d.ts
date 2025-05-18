import { SaleMethodEnum } from '../enums/sale-method.enum';
import { PaymentDayEnum } from '../enums/payment-day.enum';
export declare class RegisterSaleDto {
    sale_date: Date;
    seller: string;
    sale_method: SaleMethodEnum;
    total_number_of_payments: number;
    quota_value: number;
    payment_day: PaymentDayEnum;
    sign: number;
}
