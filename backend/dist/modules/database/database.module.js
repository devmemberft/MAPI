"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const client_entity_1 = require("../clients/entities/client.entity");
const product_entity_1 = require("../products/entities/product.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
let DataBaseModule = class DataBaseModule {
};
exports.DataBaseModule = DataBaseModule;
exports.DataBaseModule = DataBaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'devmemberft',
                password: 'immanuelveins',
                database: 'miselio',
                entities: [user_entity_1.User, product_entity_1.Product, client_entity_1.Client, sale_entity_1.Sale, payment_entity_1.Payment],
                synchronize: true,
                retryAttempts: 2,
                retryDelay: 1000,
            })
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], DataBaseModule);
//# sourceMappingURL=database.module.js.map