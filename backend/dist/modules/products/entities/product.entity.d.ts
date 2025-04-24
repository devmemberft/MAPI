import { Sale } from "src/modules/sales/entities/sale.entity";
export declare class Product {
    product_id: string;
    product_name: string;
    product_prize: number;
    product_category: 'mueble' | 'tecnologia';
    product_stock: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    sales: Sale[];
}
