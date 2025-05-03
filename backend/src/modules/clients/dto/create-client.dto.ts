import { IsString, IsNotEmpty, Matches  } from 'class-validator'

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    client_name: string;


    @IsString()
    @IsNotEmpty()
    client_lastname:string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{8}$/, {message:'Client dni must be exactly 8 digits'})
    client_dni:string;

    @IsString()
    @IsNotEmpty()
    client_address: string;

    @IsString()
    @IsNotEmpty()
    client_zone: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{11}$/, {message:'Phone number must be exactly 11 digits.'})
    client_phone: string;


}