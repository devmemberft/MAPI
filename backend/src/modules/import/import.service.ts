import { Injectable } from '@nestjs/common';
import { FullImportStrategy } from './strategies/full-import.strategy';
import { Workbook } from 'exceljs';

@Injectable()
export class ImportService {
    constructor(private readonly fullImportStrategy: FullImportStrategy){}

    async importExcel(file:Express.Multer.File):Promise<void>{
        const workbook = new Workbook();
        await workbook.xlsx.load(file.buffer);

        await this.fullImportStrategy.import(workbook);
    }
}
