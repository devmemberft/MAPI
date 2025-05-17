"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullImportStrategy = void 0;
const common_1 = require("@nestjs/common");
const clients_service_1 = require("../../clients/clients.service");
let FullImportStrategy = class FullImportStrategy {
    clientService;
    constructor(clientService) {
        this.clientService = clientService;
    }
    async import(workbook) {
        const sheet = workbook.getWorksheet('clientes');
        if (!sheet) {
            return console.log('error al encontrar nombre de la hoja, hojas disponibles: ', workbook.worksheets.map(ws => ws.name));
        }
        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);
        const MAX_ROWS = 51;
        function getRequiredCellValue(cell, rowIndex, cellIndex) {
            const value = cell?.value?.toString().trim();
            if (!value) {
                throw new common_1.BadRequestException(`Missing required value at row ${rowIndex}, column ${cellIndex}.`);
            }
            return value;
        }
        for (let i = 2; i <= Math.min(sheet.rowCount, MAX_ROWS); i++) {
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);
            const dto = {
                client_dni: getRequiredCellValue(row.getCell(1), i, 1),
                client_name: getRequiredCellValue(row.getCell(2), i, 2),
                client_address: getRequiredCellValue(row.getCell(3), i, 3),
                client_phone: getRequiredCellValue(row.getCell(4), i, 4),
                client_rute: getRequiredCellValue(row.getCell(5), i, 5),
                client_zone: getRequiredCellValue(row.getCell(6), i, 6),
            };
            try {
                const existing = await this.clientService.checkDuplication(dto.client_dni);
                if (existing) {
                    console.warn(`Row ${i}: Duplicate DNI - Skipping.`);
                    continue;
                }
                ;
                await this.clientService.createClient(dto);
                console.log(`Cliente agregado exitosamente en fila ${i}: ${dto.client_name}`);
            }
            catch (error) {
                console.error(`Error importing row ${i}:`, { error: true, message: error.message, dto });
            }
        }
    }
};
exports.FullImportStrategy = FullImportStrategy;
exports.FullImportStrategy = FullImportStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], FullImportStrategy);
//# sourceMappingURL=full-import.strategy.js.map