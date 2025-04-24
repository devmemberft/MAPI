"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const users_controller_1 = require("./users.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const hash_service_1 = require("../auth/hash.service");
const database_module_1 = require("../database/database.module");
const client_entity_1 = require("../clients/entities/client.entity");
const product_entity_1 = require("../products/entities/product.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DataBaseModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, client_entity_1.Client, product_entity_1.Product, sale_entity_1.Sale, payment_entity_1.Payment])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, hash_service_1.BcryptService]
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map