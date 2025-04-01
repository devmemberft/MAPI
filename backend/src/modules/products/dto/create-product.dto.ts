import { IsString, IsNumber, IsNotEmpty } from 'class-validator'

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    product_name:string;

    @IsString()
    @IsNotEmpty()
    category:string;

    @IsNumber()
    @IsNotEmpty()
    amount:number; 

    @IsString()
    @IsNotEmpty()
    color:string; 
}