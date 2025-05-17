import { ClientsService } from "src/modules/clients/clients.service";
import { Workbook } from "exceljs";
export declare class FullImportStrategy {
    private readonly clientService;
    constructor(clientService: ClientsService);
    import(workbook: Workbook): Promise<void>;
}
