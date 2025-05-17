import { ProductsService } from "src/modules/products/products.service";
import { Workbook } from "exceljs";
import { CreateProductDto } from "src/modules/products/dto/create-product.dto";
import { ProductCategoryEnum } from "src/modules/products/enums/product-category.enum";
import { getEnumValue, getRequiredNumber, getRequiredString } from "../utils/excel-utils";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsImportStrategy {
    constructor(private readonly productsService:ProductsService,){}
    

    async importProducts(workbook:Workbook):Promise<void>{
        const sheet = workbook.getWorksheet('productos');
        if(!sheet){ return console.log(`Error al obtener la hoja "productos", hojas disponibles: `, workbook.worksheets.map(ws => ws.name)); }

        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);

        for (let i=2; i <= sheet.rowCount; i++){
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);

            
            const productDto:CreateProductDto = {
                product_name: getRequiredString(row.getCell(1), i, 1),
                product_price: getRequiredNumber(row.getCell(3), i, 3),
                product_category: getEnumValue(row.getCell(7), i, 7, ProductCategoryEnum),
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
}

