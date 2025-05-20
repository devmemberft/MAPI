import { IsOptional, IsNumber, IsString, IsDateString, IsDate } from 'class-validator'

export class RegisterPaymentDto {

    @IsDate()
    payment_date?:Date;

    @IsNumber()
    payment_amount?:number;

    @IsOptional()
    @IsString()
    observation?:string;

}