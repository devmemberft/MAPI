import { Injectable } from '@nestjs/common';
import { FullImportStrategy } from './strategies/full-import.strategy';
import { Workbook } from 'exceljs';
import { ProductsImportStrategy } from './strategies/products-import.strategy';

@Injectable()
export class ImportService {
    constructor(
        private readonly fullImportStrategy: FullImportStrategy,
        private readonly productsImportStrategy:ProductsImportStrategy,
    ){}

    async importExcel(file:Express.Multer.File):Promise<void>{
        const workbook = new Workbook();
        await workbook.xlsx.load(file.buffer);

        await this.productsImportStrategy.importProducts(workbook);
    }
}
