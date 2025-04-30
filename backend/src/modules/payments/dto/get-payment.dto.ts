import { IsOptional, IsNumber, IsString } from 'class-validator'

export class GetTodayPaymentsDto {
    @IsOptional()
    @IsNumber()
    client_zone?:number;

    @IsOptional()
    @IsString()
    client_address?: string;
}