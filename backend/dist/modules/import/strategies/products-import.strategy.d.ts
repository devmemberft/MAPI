import { ProductsService } from "src/modules/products/products.service";
import { Workbook } from "exceljs";
export declare class ProductsImportStrategy {
    private readonly productsService;
    constructor(productsService: ProductsService);
    importProducts(workbook: Workbook): Promise<void>;
}
