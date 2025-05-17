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
exports.ProductsImportStrategy = void 0;
const products_service_1 = require("../../products/products.service");
const product_category_enum_1 = require("../../products/enums/product-category.enum");
const excel_utils_1 = require("../utils/excel-utils");
const common_1 = require("@nestjs/common");
let ProductsImportStrategy = class ProductsImportStrategy {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    async importProducts(workbook) {
        const sheet = workbook.getWorksheet('productos');
        if (!sheet) {
            return console.log(`Error al obtener la hoja "productos", hojas disponibles: `, workbook.worksheets.map(ws => ws.name));
        }
        console.log(`Procesando hoja: ${sheet.name}, filas: ${sheet.rowCount}`);
        for (let i = 2; i <= sheet.rowCount; i++) {
            const row = sheet.getRow(i);
            console.log(`Fila ${i}: `, row.values);
            const productDto = {
                product_name: (0, excel_utils_1.getRequiredString)(row.getCell(1), i, 1),
                product_price: (0, excel_utils_1.getRequiredNumber)(row.getCell(3), i, 3),
                product_category: (0, excel_utils_1.getEnumValue)(row.getCell(7), i, 7, product_category_enum_1.ProductCategoryEnum),
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
};
exports.ProductsImportStrategy = ProductsImportStrategy;
exports.ProductsImportStrategy = ProductsImportStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsImportStrategy);
//# sourceMappingURL=products-import.strategy.js.map