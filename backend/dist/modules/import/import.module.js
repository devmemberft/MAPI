"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportModule = void 0;
const common_1 = require("@nestjs/common");
const import_controller_1 = require("./import.controller");
const import_service_1 = require("./import.service");
const full_import_strategy_1 = require("./strategies/full-import.strategy");
const clients_service_1 = require("../clients/clients.service");
const client_entity_1 = require("../clients/entities/client.entity");
const database_module_1 = require("../database/database.module");
const typeorm_1 = require("@nestjs/typeorm");
const payment_entity_1 = require("../payments/entities/payment.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const user_entity_1 = require("../users/entities/user.entity");
const product_entity_1 = require("../products/entities/product.entity");
const products_service_1 = require("../products/products.service");
const sales_service_1 = require("../sales/sales.service");
const payments_service_1 = require("../payments/payments.service");
const products_import_strategy_1 = require("./strategies/products-import.strategy");
let ImportModule = class ImportModule {
};
exports.ImportModule = ImportModule;
exports.ImportModule = ImportModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DataBaseModule, typeorm_1.TypeOrmModule.forFeature([payment_entity_1.Payment, sale_entity_1.Sale, user_entity_1.User, client_entity_1.Client, product_entity_1.Product])],
        controllers: [import_controller_1.ImportController],
        providers: [import_service_1.ImportService, full_import_strategy_1.FullImportStrategy, products_import_strategy_1.ProductsImportStrategy, clients_service_1.ClientsService, products_service_1.ProductsService, sales_service_1.SalesService, payments_service_1.PaymentsService],
    })
], ImportModule);
//# sourceMappingURL=import.module.js.map