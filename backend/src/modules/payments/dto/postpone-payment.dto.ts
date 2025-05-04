import { IsOptional, IsNumber, IsString } from 'class-validator'

export class PostponePaymentDto {

    @IsOptional()
    @IsNumber()
    payment_amount?:number;

    @IsOptional()
    @IsString()
    observation?:string;
}