import { IsOptional, IsNumber, IsString } from 'class-validator'

export class PostponePaymentDto {
    @IsOptional()
    @IsString()
    observation?:string;
}