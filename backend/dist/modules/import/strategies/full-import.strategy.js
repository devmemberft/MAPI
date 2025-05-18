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
const excel_utils_1 = require("../utils/excel-utils");
const products_service_1 = require("../../products/products.service");
const sales_service_1 = require("../../sales/sales.service");
const payments_service_1 = require("../../payments/payments.service");
const product_category_enum_1 = require("../../products/enums/product-category.enum");
const sale_method_enum_1 = require("../../sales/enums/sale-method.enum");
const payment_day_enum_1 = require("../../sales/enums/payment-day.enum");
let FullImportStrategy = class FullImportStrategy {
    clientService;
    productsService;
    salesService;
    paymentsService;
    constructor(clientService, productsService, salesService, paymentsService) {
        this.clientService = clientService;
        this.productsService = productsService;
        this.salesService = salesService;
        this.paymentsService = paymentsService;
    }
    async importClients(workbook) {
        const sheet = workbook.getWorksheet('Clientes');
        if (!sheet) {
            return console.log('error al encontrar nombre de la hoja, hojas disponibles: ', workbook.worksheets.map(ws => ws.name));
        }
        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);
            const dto = {
                client_dni: (0, excel_utils_1.getRequiredString)(row.getCell(2), i, 2),
                client_name: (0, excel_utils_1.getRequiredString)(row.getCell(3), i, 3),
                client_address: (0, excel_utils_1.getRequiredString)(row.getCell(4), i, 4),
                client_phone: (0, excel_utils_1.getRequiredString)(row.getCell(5), i, 5),
                client_rute: (0, excel_utils_1.getRequiredString)(row.getCell(6), i, 6),
                client_zone: (0, excel_utils_1.getRequiredString)(row.getCell(7), i, 7),
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
    async importProducts(workbook) {
        const sheet = workbook.getWorksheet('productosactualizados');
        if (!sheet) {
            return console.log(`Error al obtener la hoja "productos", hojas disponibles: `, workbook.worksheets.map(ws => ws.name));
        }
        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);
            const productDto = {
                product_name: (0, excel_utils_1.getRequiredString)(row.getCell(1), i, 1),
                product_price: (0, excel_utils_1.getRequiredNumber)(row.getCell(2), i, 2),
                product_category: (0, excel_utils_1.getEnumValue)(row.getCell(3), i, 3, product_category_enum_1.ProductCategoryEnum),
            };
            try {
                const existing = await this.productsService.checkDuplication(productDto.product_name);
                if (existing) {
                    console.warn(`Row ${i}: Duplicate product - Skipping.`);
                    continue;
                }
                ;
                await this.productsService.createProduct(productDto);
                console.log(`Producto agregado exitosamente en fila ${i}: ${productDto.product_name}`);
            }
            catch (error) {
                console.error(`Error importing row ${i}:`, { error: true, message: error.message, productDto });
            }
        }
    }
    async importSalesAndPayments(workbook) {
        const sheet = workbook.getWorksheet('Clientes');
        if (!sheet) {
            return console.log(`La hoja "Clientes" no ha sido encontrada, hojas disponibles: `, workbook.worksheets.map(ws => ws.name));
        }
        const PAYMENTS_COLUMNS_START = 17;
        const LAST_PAYMENT_COLUMN = 48;
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            console.log(`Fila ${i}:`, row.values);
            try {
                const client_dni = (0, excel_utils_1.getRequiredString)(row.getCell(2), i, 2);
                console.log(`Fila ${i}, columna 8 (sale_date):`, row.getCell(8).value);
                const sale_date = (0, excel_utils_1.getRequiredDate)(row.getCell(8), i, 8);
                const product_name = (0, excel_utils_1.getRequiredString)(row.getCell(9), i, 9);
                const seller = (0, excel_utils_1.getRequiredString)(row.getCell(10), i, 10);
                const sale_method = (0, excel_utils_1.getEnumValue)(row.getCell(11), i, 11, sale_method_enum_1.SaleMethodEnum);
                const total_number_of_payments = (0, excel_utils_1.getRequiredNumber)(row.getCell(13), i, 13);
                const quota_value = (0, excel_utils_1.getRequiredNumber)(row.getCell(14), i, 14);
                const payment_day = (0, excel_utils_1.getEnumValue)(row.getCell(15), i, 15, payment_day_enum_1.PaymentDayEnum);
                const sign = (0, excel_utils_1.getRequiredNumber)(row.getCell(16), i, 16);
                const client = await this.clientService.findClientByDni(client_dni);
                if (!client) {
                    throw new Error(`Cliente no encontrado: ${client_dni}`);
                }
                const product = await this.productsService.findProductByName(product_name);
                if (!product) {
                    throw new Error(`Producto no encontrado: ${product_name}`);
                }
                const registerSaleDto = {
                    sale_date,
                    seller,
                    sale_method,
                    total_number_of_payments,
                    payment_day,
                    sign,
                    quota_value,
                };
                console.log(`DTO fila ${i}:`, registerSaleDto);
                const sale = await this.salesService.registerSale(client_dni, product.product_id, registerSaleDto);
                console.log(`Venta registrada (fila ${i}) para cliente ${client_dni} y producto ${product_name}`);
                for (let j = PAYMENTS_COLUMNS_START; j < Math.min(row.cellCount, LAST_PAYMENT_COLUMN); j += 2) {
                    const dateCell = row.getCell(j);
                    const paymentCell = row.getCell(j + 1);
                    if (!paymentCell || !dateCell || !paymentCell.value || !dateCell.value) {
                        break;
                    }
                    ;
                    const registerPaymentDto = {
                        payment_amount: Number(paymentCell.value),
                        payment_date: new Date(dateCell.value),
                    };
                    await this.paymentsService.registerClientPayment(sale.sale_id, registerPaymentDto);
                    console.log(`Pago registrado (fila ${i}, columna ${j})`);
                }
                console.log(`Fila ${i}: Venta y pagos importados correctamente.`);
            }
            catch (error) {
                console.error(`Error en fila ${i}: `, { message: error.message });
                continue;
            }
        }
    }
};
exports.FullImportStrategy = FullImportStrategy;
exports.FullImportStrategy = FullImportStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_service_1.ClientsService,
        products_service_1.ProductsService,
        sales_service_1.SalesService,
        payments_service_1.PaymentsService])
], FullImportStrategy);
//# sourceMappingURL=full-import.strategy.js.map