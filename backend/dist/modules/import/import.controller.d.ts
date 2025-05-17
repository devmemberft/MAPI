import { ImportService } from './import.service';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
    ImportAllFromExcel(file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
