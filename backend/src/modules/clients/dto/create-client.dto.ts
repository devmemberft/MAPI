import { IsString, IsNotEmpty, Matches  } from 'class-validator'

export class CreateClientDto {

    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{9}$/, {message:'Client dni must be exactly 9 digits'})
    client_dni:string;

    @IsString()
    @IsNotEmpty()
    client_name: string;
    
    @IsString()
    @IsNotEmpty()
    client_address: string;
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{22}$/, {message:'Phone number must be exactly 22 digits.'})
    client_phone: string;

    @IsString()
    @IsNotEmpty()
    client_rute:string;

    @IsString()
    @IsNotEmpty()
    client_zone: string;



}