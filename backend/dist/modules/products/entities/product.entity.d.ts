import { Sale } from "src/modules/sales/entities/sale.entity";
import { ProductCategoryEnum } from "../enums/product-category.enum";
export declare class Product {
    product_id: string;
    product_name: string;
    product_price: number;
    product_category: ProductCategoryEnum;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    sales: Sale[];
}
