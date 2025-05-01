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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sale_entity_1 = require("./entities/sale.entity");
const clients_service_1 = require("../clients/clients.service");
const products_service_1 = require("../products/products.service");
let SalesService = class SalesService {
    saleRepository;
    clientsService;
    productsService;
    constructor(saleRepository, clientsService, productsService) {
        this.saleRepository = saleRepository;
        this.clientsService = clientsService;
        this.productsService = productsService;
    }
    async registerSale(client_dni, product_id, registerSaleDto) {
        const checkClientExistence = await this.clientsService.findClientByDni(client_dni);
        const checkProductExistence = await this.productsService.findProductById(product_id);
        if (!checkClientExistence || !checkProductExistence) {
            throw new common_1.NotFoundException('Item not found');
        }
        const newSale = new sale_entity_1.Sale();
        newSale.products = [checkProductExistence];
        newSale.client = checkClientExistence;
        newSale.sign = registerSaleDto.sign;
        newSale.payment_frecuency = registerSaleDto.payment_frecuency;
        newSale.payment_day = registerSaleDto.payment_day;
        newSale.quota_value = registerSaleDto.quota_value;
        newSale.number_of_payments = registerSaleDto.number_of_payments;
        newSale.balance_amount = registerSaleDto.balance_amount;
        return await this.saleRepository.save(newSale);
    }
    async updateSale(sale_id, updateSaleDto) {
        const sale = await this.findSaleById(sale_id);
        Object.assign(sale, {
            payment_frecuency: updateSaleDto.payment_frecuency,
            payment_day: updateSaleDto.payment_day,
        });
        return this.saleRepository.save(sale);
    }
    async deleteSale(sale_id) {
        const sale = await this.findSaleById(sale_id);
        await this.saleRepository.delete(sale);
    }
    async findAllSales() {
        return await this.saleRepository.find();
    }
    async findSaleById(sale_id) {
        const checkExistence = await this.saleRepository.findOneBy({ sale_id });
        if (!checkExistence) {
            throw new common_1.NotFoundException(`The sale with id: ${sale_id} was not found`);
        }
        return checkExistence;
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        clients_service_1.ClientsService,
        products_service_1.ProductsService])
], SalesService);
//# sourceMappingURL=sales.service.js.map