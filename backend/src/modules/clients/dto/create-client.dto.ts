import { IsString, IsNotEmpty, IsNumber, IsPhoneNumber  } from 'class-validator'

export class CreateclientDto {

    @IsString()
    @IsNotEmpty()
    name: string;


    @IsString()
    @IsNotEmpty()
    lastname:string;

    @IsNumber()
    @IsNotEmpty()
    dni: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: number;

    
}