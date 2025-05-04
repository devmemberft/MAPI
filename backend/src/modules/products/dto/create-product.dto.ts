import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator'

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    product_name:string;

    @IsNumber()
    @IsNotEmpty()
    product_price:number; 

    @IsEnum({muebles:'mueble',tecnologia:'tecnologia'},{message:'Must select one'})
    @IsNotEmpty()
    product_category:'mueble' | 'tecnologia';

    /*@IsNumber()
    @IsNotEmpty()
    product_stock:number;  */

}