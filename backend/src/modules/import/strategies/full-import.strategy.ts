import { Injectable } from "@nestjs/common";
import { ClientsService } from "src/modules/clients/clients.service";
import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";
import * as ExcelJS from 'exceljs';
import { Workbook } from "exceljs";
import { getRequiredString} from "../utils/excel-utils";

@Injectable()
export class FullImportStrategy {
    constructor(
        private readonly clientService:ClientsService,
    ) {} // add services

    
    async importClients(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('clientes');
        if(!sheet) { return console.log('error al encontrar nombre de la hoja, hojas disponibles: ', workbook.worksheets.map(ws => ws.name));}

        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        const MAX_ROWS=51;

        

        for (let i=2; i<= Math.min(sheet.rowCount,MAX_ROWS); i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const dto:CreateClientDto = {
                client_dni: getRequiredString(row.getCell(1), i, 1),
                client_name: getRequiredString(row.getCell(2), i, 2),
                client_address: getRequiredString(row.getCell(3), i, 3),
                client_phone: getRequiredString(row.getCell(4), i, 4),
                client_rute: getRequiredString(row.getCell(5), i, 5),
                client_zone: getRequiredString(row.getCell(6), i, 6),
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