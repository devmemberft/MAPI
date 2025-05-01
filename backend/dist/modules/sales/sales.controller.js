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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesController = void 0;
const common_1 = require("@nestjs/common");
const sales_service_1 = require("./sales.service");
const register_sale_dto_1 = require("./dto/register-sale.dto");
const update_sale_dto_1 = require("./dto/update-sale.dto");
let SalesController = class SalesController {
    salesService;
    constructor(salesService) {
        this.salesService = salesService;
    }
    async registerSale(client_dni, product_id, registerSaleDto) {
        return await this.salesService.registerSale(client_dni, product_id, registerSaleDto);
    }
    async updateSale(sale_id, updateSaleDto) {
        return await this.salesService.updateSale(sale_id, updateSaleDto);
    }
    async deleteSale(sale_id) { return await this.salesService.deleteSale(sale_id); }
    async findAllSales() { return await this.salesService.findAllSales(); }
    async findSaleById(sale_id) {
        return await this.salesService.findSaleById(sale_id);
    }
};
exports.SalesController = SalesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('client_dni')),
    __param(1, (0, common_1.Param)('product_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, register_sale_dto_1.RegisterSaleDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "registerSale", null);
__decorate([
    __param(0, (0, common_1.Param)('sale_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sale_dto_1.UpdateSaleDto]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "updateSale", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)('sale_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "deleteSale", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findAllSales", null);
__decorate([
    (0, common_1.Get)(':sale_id'),
    __param(0, (0, common_1.Param)('sale_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SalesController.prototype, "findSaleById", null);
exports.SalesController = SalesController = __decorate([
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sales_service_1.SalesService])
], SalesController);
//# sourceMappingURL=sales.controller.js.map