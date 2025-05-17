import { ProductCategoryEnum } from '../enums/product-category.enum';
export declare class CreateProductDto {
    product_name: string;
    product_price: number;
    product_category: ProductCategoryEnum;
}
