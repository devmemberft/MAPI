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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const sale_entity_1 = require("../sales/entities/sale.entity");
const client_entity_1 = require("../clients/entities/client.entity");
let PaymentsService = class PaymentsService {
    PaymentRepository;
    SaleRepository;
    ClientRepository;
    constructor(PaymentRepository, SaleRepository, ClientRepository) {
        this.PaymentRepository = PaymentRepository;
        this.SaleRepository = SaleRepository;
        this.ClientRepository = ClientRepository;
    }
    getToday() {
        return ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][new Date().getDay()];
    }
    async buildDailyRoute() {
        const today = this.getToday();
        const clients = await this.ClientRepository.createQueryBuilder('client')
            .leftJoinAndSelect('client.sales', 'sale')
            .leftJoinAndSelect('sale.payments', 'payment')
            .where('sale.payment_day = :day', { today })
            .andWhere('sale.payment_frecuency = :freq', { freq: 'diario' })
            .getMany();
        return this.sortClients(clients);
    }
    sortClients(clients) {
        return clients.sort((a, b) => {
            const zoneCompare = a.client_zone.localeCompare(b.client_zone);
            if (zoneCompare !== 0)
                return zoneCompare;
            return a.client_address.localeCompare(b.client_address);
        });
    }
    async registerClientPayment(registerPaymentDto) {
        const sale = await this.SaleRepository.findOne({
            where: { sale_id: registerPaymentDto.sale_id },
            relations: ['client', 'payments'],
        });
        if (!sale) {
            throw new common_1.NotFoundException('Sale not found');
        }
        const existingPayment = await this.PaymentRepository.findOne({
            where: {
                sale: { sale_id: registerPaymentDto.sale_id },
                payment_date: new Date(registerPaymentDto.payment_date),
            }
        });
        if (existingPayment) {
            throw new common_1.ConflictException('Payment was already registered.');
        }
        const payment = this.PaymentRepository.create({
            sale,
            payment_date: new Date(registerPaymentDto.payment_date),
            payment_amount: registerPaymentDto.payment_amount,
            observation: registerPaymentDto.observation,
        });
        return await this.PaymentRepository.save(payment);
    }
    async postponePayment(registerPaymentDto) {
        return await this.registerClientPayment({ ...registerPaymentDto, payment_amount: 0 });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(sale_entity_1.Sale)),
    __param(2, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map