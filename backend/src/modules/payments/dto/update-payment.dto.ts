import { IsBoolean, IsOptional, IsNumber, IsString } from 'class-validator'

export class UpdatePaymentDto {
    @IsBoolean()
    payment_made: boolean;

    @IsOptional()
    @IsNumber()
    payment_amount?:number;

    @IsOptional()
    @IsString()
    observation?:string;
}