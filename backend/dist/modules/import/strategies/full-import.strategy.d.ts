import { ClientsService } from "src/modules/clients/clients.service";
import { ProductsService } from "src/modules/products/products.service";
import { Workbook } from "exceljs";
export declare class FullImportStrategy {
    private readonly clientService;
    private readonly productsService;
    constructor(clientService: ClientsService, productsService: ProductsService);
    importClients(workbook: Workbook): Promise<void>;
}
