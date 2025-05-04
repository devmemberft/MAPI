import { Sale } from "src/modules/sales/entities/sale.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_price: number;
    product_category: 'mueble' | 'tecnologia';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    sales: Sale[];
}
