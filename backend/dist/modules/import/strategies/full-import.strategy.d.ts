import { ClientsService } from "src/modules/clients/clients.service";
import { Workbook } from "exceljs";
import { ProductsService } from "src/modules/products/products.service";
import { SalesService } from "src/modules/sales/sales.service";
import { PaymentsService } from "src/modules/payments/payments.service";
export declare class FullImportStrategy {
    private readonly clientService;
    private readonly productsService;
    private readonly salesService;
    private readonly paymentsService;
    constructor(clientService: ClientsService, productsService: ProductsService, salesService: SalesService, paymentsService: PaymentsService);
    importClients(workbook: Workbook): Promise<void>;
    importProducts(workbook: Workbook): Promise<void>;
    importSalesAndPayments(workbook: Workbook): Promise<void>;
}
