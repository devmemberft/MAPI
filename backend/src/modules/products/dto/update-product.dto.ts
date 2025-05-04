import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator'
export class UpdateProductDto {

    @IsString()
    @IsOptional()
    product_name?:string;

    @IsNumber()
    @IsOptional()
    product_price?:number; 

    @IsEnum({mueble:'mueble',tecnologia:'tecnologia'},{message:'Must select one'})
    @IsOptional()
    product_category?:'mueble' | 'tecnologia';

    /*@IsNumber()
    @IsOptional()
    product_stock?:number; */

}