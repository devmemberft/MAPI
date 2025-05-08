import { IsString, IsOptional, IsNumber, IsPhoneNumber  } from 'class-validator'

export class UpdateClientDto {

    @IsString()
    @IsOptional()
    client_name?: string;


    @IsString()
    @IsOptional()
    client_lastname?:string;

    @IsNumber()
    @IsOptional()
    client_dni?: number;

    @IsString()
    @IsOptional()
    client_address?: string;

    @IsPhoneNumber()
    @IsOptional()
    client_phone?: number;

    
}