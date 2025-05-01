import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator'

export class RegisterPaymentDto {

    @IsNumber()
    payment_amount:number;

    @IsOptional()
    @IsString()
    observation?:string;

    @IsDateString()
    payment_date:string;

    @IsString()
    sale_id: string;
}