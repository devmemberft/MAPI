"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sales_service_1 = require("./sales.service");
const sales_controller_1 = require("./sales.controller");
const sale_entity_1 = require("./entities/sale.entity");
const database_module_1 = require("../database/database.module");
const client_entity_1 = require("../clients/entities/client.entity");
const product_entity_1 = require("../products/entities/product.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const user_entity_1 = require("../users/entities/user.entity");
let SalesModule = class SalesModule {
};
exports.SalesModule = SalesModule;
exports.SalesModule = SalesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DataBaseModule, typeorm_1.TypeOrmModule.forFeature([sale_entity_1.Sale, client_entity_1.Client, product_entity_1.Product, payment_entity_1.Payment, user_entity_1.User])],
        providers: [sales_service_1.SalesService],
        controllers: [sales_controller_1.SalesController]
    })
], SalesModule);
//# sourceMappingURL=sales.module.js.map