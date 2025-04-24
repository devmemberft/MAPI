import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber  } from 'class-validator'

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    client_name: string;


    @IsString()
    @IsNotEmpty()
    client_lastname:string;

    @IsNumber()
    @IsNotEmpty()
    client_dni: number;

    @IsString()
    @IsNotEmpty()
    client_address: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    client_phone: number;


}