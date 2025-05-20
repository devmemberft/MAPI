import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator'
import { ProductCategoryEnum } from '../enums/product-category.enum';
export class UpdateProductDto {

    @IsString()
    @IsOptional()
    product_name?:string;

    @IsNumber()
    @IsOptional()
    product_price?:number; 

    @IsEnum(ProductCategoryEnum,{message:'Must select one'})
    @IsOptional()
    product_category?:ProductCategoryEnum;

    /*@IsNumber()
    @IsOptional()
    product_stock?:number; */

}