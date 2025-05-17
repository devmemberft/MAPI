import { Injectable } from '@nestjs/common';
import { FullImportStrategy } from './strategies/full-import.strategy';
import { Workbook } from 'exceljs';

@Injectable()
export class ImportService {
    constructor(private readonly fullImportStrategy: FullImportStrategy){}

    async importExcel(buffer:Buffer):Promise<void>{
        const workbook = new Workbook();
        await workbook.xlsx.load(buffer);

        await this.fullImportStrategy.import(workbook);
    }
}
