"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const product_entity_1 = require("./entities/product.entity");
const database_module_1 = require("../database/database.module");
const sale_entity_1 = require("../sales/entities/sale.entity");
const user_entity_1 = require("../users/entities/user.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DataBaseModule, typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product, sale_entity_1.Sale, user_entity_1.User, client_entity_1.Client, payment_entity_1.Payment])],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map