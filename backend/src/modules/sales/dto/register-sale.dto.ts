import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator'
import { SaleMethodEnum } from '../enums/sale-method.enum';
import { PaymentDayEnum } from '../enums/payment-day.enum';
import { PaymentFrecuencyEnum } from '../enums/payment-frecuency.enum';

export class RegisterSaleDto {

    @IsString()
    @IsNotEmpty()
    seller:string;

    @IsEnum(SaleMethodEnum)
    @IsNotEmpty()
    sale_method:SaleMethodEnum;

    @IsNumber()
    @IsNotEmpty()
    total_number_of_payments:number;

    @IsNumber()
    @IsNotEmpty()
    quota_value:number;

    /*
    @IsEnum(PaymentDayEnum,{message:'Must select one'})
    @IsNotEmpty()
    payment_day:PaymentDayEnum;
    @IsEnum(PaymentFrecuencyEnum,{message:'Must select one'})
    @IsNotEmpty()
    payment_frecuency:PaymentFrecuencyEnum;
    */
    
    @IsNumber()
    @IsNotEmpty()
    sign:number;




}