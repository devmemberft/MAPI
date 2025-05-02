import { IsOptional, IsNumber, IsString } from 'class-validator'

export class UpdatePaymentDto {

    @IsOptional()
    @IsNumber()
    payment_amount?:number;

    @IsOptional()
    @IsString()
    observation?:string;
}