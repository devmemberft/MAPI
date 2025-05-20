import { Injectable } from "@nestjs/common";
import { ClientsService } from "src/modules/clients/clients.service";
import { CreateClientDto } from "src/modules/clients/dto/create-client.dto";
import * as ExcelJS from 'exceljs';
import { Workbook } from "exceljs";
import { getEnumValue, getRequiredDate, getRequiredNumber, getRequiredString} from "../utils/excel-utils";
import { ProductsService } from "src/modules/products/products.service";
import { SalesService } from "src/modules/sales/sales.service";
import { PaymentsService } from "src/modules/payments/payments.service";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";
import { ProductCategoryEnum } from "src/modules/products/enums/product-category.enum";
import { SaleMethodEnum } from "src/modules/sales/enums/sale-method.enum";
import { PaymentFrecuencyEnum } from "src/modules/sales/enums/payment-frecuency.enum";
import { RegisterSaleDto } from "src/modules/sales/dto/register-sale.dto";
import { PaymentDayEnum } from "src/modules/sales/enums/payment-day.enum";
import { RegisterPaymentDto } from "src/modules/payments/dto/register-payment.dto";

@Injectable()
export class FullImportStrategy {
    constructor(
        private readonly clientService:ClientsService,
        private readonly productsService:ProductsService,
        private readonly salesService:SalesService,
        private readonly paymentsService:PaymentsService,
    ) {}

    
    async importClients(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('Clientes');
        if(!sheet) { return console.log('error al encontrar nombre de la hoja, hojas disponibles: ', workbook.worksheets.map(ws => ws.name));}

        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        for (let i=2; i<= sheet.rowCount; i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const dto:CreateClientDto = {
                client_dni: getRequiredString(row.getCell(2), i, 2),
                client_name: getRequiredString(row.getCell(3), i, 3),
                client_address: getRequiredString(row.getCell(4), i, 4),
                client_phone: getRequiredString(row.getCell(5), i, 5),
                client_rute: getRequiredString(row.getCell(6), i, 6),
                client_zone: getRequiredString(row.getCell(7), i, 7),
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

    async importProducts(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('productosactualizados');
        if(!sheet){ return console.log(`Error al obtener la hoja "productos", hojas disponibles: `, workbook.worksheets.map(ws => ws.name)); }

        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        for (let i=2; i <= sheet.rowCount; i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const productDto:CreateProductDto = {
                product_name: getRequiredString(row.getCell(1), i, 1),
                product_price: getRequiredNumber(row.getCell(2), i, 2),
                product_category: getEnumValue(row.getCell(3), i, 3, ProductCategoryEnum),
            };


            try {
                const existing = await this.productsService.checkDuplication(productDto.product_name);
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

    async importSalesAndPayments(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('Clientes');
        if(!sheet) { return console.log(`La hoja "Clientes" no ha sido encontrada, hojas disponibles: `, workbook.worksheets.map(ws => ws.name)); }
        
        const PAYMENTS_COLUMNS_START = 17; 
        const LAST_PAYMENT_COLUMN = 48;


        for(let i = 2; i<= sheet.rowCount; i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}:`,row.values);

            try{
                const client_dni = getRequiredString(row.getCell(2), i, 2);
                console.log(`Fila ${i}, columna 8 (sale_date):`, row.getCell(8).value);
                const sale_date = getRequiredDate(row.getCell(8), i, 8);
                const product_name = getRequiredString(row.getCell(9), i, 9);
                const seller = getRequiredString(row.getCell(10), i, 10);
                const sale_method = getEnumValue(row.getCell(11), i, 11, SaleMethodEnum);
                const total_number_of_payments = getRequiredNumber(row.getCell(13), i, 13);
                const quota_value = getRequiredNumber(row.getCell(14), i, 14);
                const payment_day = getEnumValue(row.getCell(15), i, 15, PaymentDayEnum);
                //const payment_frecuency = getEnumValue(row.getCell(6), i, 6, PaymentFrecuencyEnum);
                const sign = getRequiredNumber(row.getCell(16), i, 16);

                const client = await this.clientService.findClientByDni(client_dni);
                if(!client){ throw new Error(`Cliente no encontrado: ${client_dni}`); }
                
                const product = await this.productsService.findProductByName(product_name);
                if(!product){ throw new Error(`Producto no encontrado: ${product_name}`); }

                const registerSaleDto:RegisterSaleDto = {
                    sale_date,
                    seller,
                    sale_method,
                    total_number_of_payments,
                    payment_day,
                    //payment_frecuency,
                    sign,
                    quota_value,
                };
                console.log(`DTO fila ${i}:`, registerSaleDto);
                const sale = await this.salesService.registerSale(client_dni,product.product_id, registerSaleDto);
                console.log(`Venta registrada (fila ${i}) para cliente ${client_dni} y producto ${product_name}`);

                for(let j = PAYMENTS_COLUMNS_START; j < Math.min(row.cellCount,LAST_PAYMENT_COLUMN);j+=2){
                    const dateCell = row.getCell(j);
                    const paymentCell = row.getCell(j+1);

                    if(!paymentCell || !dateCell || !paymentCell.value || !dateCell.value) {break};

                    const registerPaymentDto:RegisterPaymentDto = {
                        payment_amount: Number(paymentCell.value),
                        payment_date: new Date(dateCell.value as string),
                    };

                    await this.paymentsService.registerClientPayment(sale.sale_id,registerPaymentDto);
                    console.log(`Pago registrado (fila ${i}, columna ${j})`);
                }
                console.log(`Fila ${i}: Venta y pagos importados correctamente.`);
            }catch(error){
                console.error(`Error en fila ${i}: `, {message:error.message});
                continue;
            }
        }
    }

}