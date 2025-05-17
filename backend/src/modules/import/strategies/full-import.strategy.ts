import { BadRequestException, Injectable } from "@nestjs/common";
import { ClientsService } from "src/modules/clients/clients.service";
import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";
import * as ExcelJS from 'exceljs';
import { Workbook } from "exceljs";

@Injectable()
export class FullImportStrategy {
    constructor(private readonly clientService:ClientsService ) {} // add services

    
    async import(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('Clientes');
        if(!sheet) return;

        function getRequiredCellValue(cell:any, rowIndex:number, cellIndex:number):string{
            const value = cell?.value?.toString().trim();
            if(!value) {throw new BadRequestException(`Missing required value at row ${rowIndex}, column ${cellIndex}.`)}
            return value;
        }

        for (let i=2; i<= sheet.rowCount; i++){
            const row = sheet.getRow(i);

            
            const dto:CreateClientDto = {
                client_name: getRequiredCellValue(row.getCell(1), i, 1),
                client_lastname: getRequiredCellValue(row.getCell(2), i, 2),
                client_dni: getRequiredCellValue(row.getCell(3), i, 3),
                client_phone: getRequiredCellValue(row.getCell(4), i, 4),
                client_address: getRequiredCellValue(row.getCell(5), i, 5),
                client_zone: getRequiredCellValue(row.getCell(6), i, 6),
            };


            try {
                await this.clientService.createClient(dto);
            } catch (error) {
                console.error(`Error importing row ${i}:`,{error: true, message:error.message, dto});
            }
        }
    }

}
