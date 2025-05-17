import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator'
import { ProductCategoryEnum } from '../enums/product-category.enum';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    product_name:string;

    @IsNumber()
    @IsNotEmpty()
    product_price:number; 

    @IsEnum(ProductCategoryEnum,{message:'Must select one'})
    @IsNotEmpty()
    product_category:ProductCategoryEnum;

}