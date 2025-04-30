import { IsString, IsOptional, IsNumber, IsPhoneNumber  } from 'class-validator'

export class UpdateClientDto {

    @IsString()
    @IsOptional()
    name?: string;


    @IsString()
    @IsOptional()
    lastname?:string;

    @IsNumber()
    @IsOptional()
    dni?: number;

    @IsString()
    @IsOptional()
    address?: string;

    @IsPhoneNumber()
    @IsOptional()
    phone?: number;

    
}