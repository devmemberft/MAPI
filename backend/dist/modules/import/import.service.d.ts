import { FullImportStrategy } from './strategies/full-import.strategy';
import { ProductsImportStrategy } from './strategies/products-import.strategy';
export declare class ImportService {
    private readonly fullImportStrategy;
    private readonly productsImportStrategy;
    constructor(fullImportStrategy: FullImportStrategy, productsImportStrategy: ProductsImportStrategy);
    importExcel(file: Express.Multer.File): Promise<void>;
}
