import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator'

export class RegisterPaymentDto {

    @IsString()
    sale_id: string;
    
    @IsNumber()
    payment_amount:number;

    @IsOptional()
    @IsString()
    observation?:string;

}