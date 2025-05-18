import { SaleMethodEnum } from '../enums/sale-method.enum';
export declare class RegisterSaleDto {
    seller: string;
    sale_method: SaleMethodEnum;
    total_number_of_payments: number;
    quota_value: number;
    sign: number;
}
