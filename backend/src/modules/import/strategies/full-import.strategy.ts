import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientsService } from "src/modules/clients/clients.service";
import { ProductsService } from "src/modules/products/products.service";
import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";
import * as ExcelJS from 'exceljs';
import { Workbook } from "exceljs";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";

@Injectable()
export class FullImportStrategy {
    constructor(
        private readonly clientService:ClientsService,
        private readonly productsService:ProductsService,
    ) {} // add services

    
    async importClients(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('clientes');
        if(!sheet) { return console.log('error al encontrar nombre de la hoja, hojas disponibles: ', workbook.worksheets.map(ws => ws.name));}

        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        const MAX_ROWS=51;

        function getRequiredCellValue(cell:any, rowIndex:number, cellIndex:number):string{
            const value = cell?.value?.toString().trim();
            if(!value) {throw new BadRequestException(`Missing required value at row ${rowIndex}, column ${cellIndex}.`)}
            return value;
        }

        for (let i=2; i<= Math.min(sheet.rowCount,MAX_ROWS); i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const dto:CreateClientDto = {
                client_dni: getRequiredCellValue(row.getCell(1), i, 1),
                client_name: getRequiredCellValue(row.getCell(2), i, 2),
                client_address: getRequiredCellValue(row.getCell(3), i, 3),
                client_phone: getRequiredCellValue(row.getCell(4), i, 4),
                client_rute: getRequiredCellValue(row.getCell(5), i, 5),
                client_zone: getRequiredCellValue(row.getCell(6), i, 6),
            };


            try {
                const existing = await this.clientService.checkDuplication(dto.client_dni);
                if(existing){
                    console.warn(`Row ${i}: Duplicate DNI - Skipping.`)
                    continue;
                };

                await this.clientService.createClient(dto);
                console.log(`Cliente agregado exitosamente en fila ${i}: ${dto.client_name}`)
            } catch (error) {
                console.error(`Error importing row ${i}:`,{error: true, message:error.message, dto});
            }
        }
    }

}

/*
aun no me decido si tomar toda la informacion de una hoja madre o dividir las entidades en hojas y factorizar
async importProducts(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('productos');
        if(!sheet){ return console.log(`Error al obtener la hoja "productos", hojas disponibles: `, workbook.worksheets.map(ws => ws.name)); }

         console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        function getRequiredCellValue(cell:any, rowIndex:number, cellIndex:number):string{
        const value = cell?.value?.toString().trim();
        if(!value) {throw new BadRequestException(`Missing required value at row ${rowIndex}, column ${cellIndex}.`)}
        return value;
        }


        function getRequiredNumberValue(cell:any, rowIndex:number, cellIndex:number):number{
        const raw = cell?.value;
        const num = Number(raw);
        if(isNaN(num)) {throw new BadRequestException(`Invalid format value for number at row ${rowIndex}, column ${cellIndex}. Value: ${raw}`); }
        return num;
        }

        function getRequiredEnumValue<T>(cell:any, rowIndex:number, cellIndex:number, enumType: T): T[keyof T] {
            const raw = cell?.value?.toString().trim().toLowerCase();
            const values = Object.values(enumType);
            if(!values.includes(raw as any)) { throw new BadRequestException(`Invalid format value for enum at row ${rowIndex}, Column ${cellIndex}, Value ${raw}`); }
            return raw as T[keyof T];
        }

        for (let i=2; i <= sheet.rowCount; i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const productDto:CreateProductDto = {
                product_name: getRequiredCellValue(row.getCell(1), i, 1),
                product_price: Number(row.getCell(3).value),
                product_category: getRequiredCellValue(row.getCell(7), i, 7),
            };


            try {
                const existing = await this.productsService.findProductByName(productDto.product_name);
                if(existing){
                    console.warn(`Row ${i}: Duplicate product - Skipping.`)
                    continue;
                };

                await this.productsService.createProduct(productDto);
                console.log(`Producto agregado exitosamente en fila ${i}: ${productDto.product_name}`)
            } catch (error) {
                console.error(`Error importing row ${i}:`,{error: true, message:error.message, productDto});
            }
        }
    }
*/