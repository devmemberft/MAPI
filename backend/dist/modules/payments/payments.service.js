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
const payment_frecuency_enum_1 = require("./payment-frecuency.enum");
const sales_service_1 = require("../sales/sales.service");
let PaymentsService = class PaymentsService {
    PaymentRepository;
    SaleRepository;
    ClientRepository;
    salesService;
    constructor(PaymentRepository, SaleRepository, ClientRepository, salesService) {
        this.PaymentRepository = PaymentRepository;
        this.SaleRepository = SaleRepository;
        this.ClientRepository = ClientRepository;
        this.salesService = salesService;
    }
    getToday() {
        return ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][new Date().getDay()];
    }
    async buildDailyRoute() {
        const today = new Date();
        const weekday = today.toLocaleDateString('es-ES', { weekday: 'long' }).toLowerCase();
        const monthday = today.getDate().toString().padStart(2, '0') + ' de mes';
        const freqs = [
            payment_frecuency_enum_1.paymentFrecuency.diario,
            payment_frecuency_enum_1.paymentFrecuency.semanal,
            payment_frecuency_enum_1.paymentFrecuency.quincenal,
            payment_frecuency_enum_1.paymentFrecuency.mensual,
        ];
        const clients = await this.ClientRepository.createQueryBuilder('client')
            .leftJoinAndSelect('client.sales', 'sale')
            .leftJoin('sale.payments', 'payment')
            .groupBy('client.client_id')
            .addGroupBy('sale.sale_id')
            .having(`
            (
            sale.payment_day = :diario
            )
            OR (
                sale.payment_day = :weekday
            )
            OR (
                sale.payment_day = :monthday
            )
            OR (
                sale.payment_day = 'semanal'
                AND (
                    (
                        MAX(payment.created_at) IS NOT NULL
                        AND MAX(payment.created_at) <= NOW() - INTERVAL '7 days'
                    )
                    OR (
                        MAX(payment.created_at) IS NULL
                        AND sale.created_at <= NOW() - INTERVAL '7 days'
                    )
                )
            )
            OR (
                sale.payment_day = 'quincenal'
                AND (
                    (
                        MAX(payment.created_at) IS NOT NULL
                        AND MAX(payment.created_at) <= NOW() - INTERVAL '15 days'
                    )
                    OR (
                        MAX(payment.created_at) IS NULL
                        AND sale.created_at <= NOW() - INTERVAL '15 days'
                    )
                )
            )
            OR (
                sale.payment_day = 'mensual'
                AND (
                    (
                        MAX(payment.created_at) IS NOT NULL
                        AND MAX(payment.created_at) <= NOW() - INTERVAL '30 days'
                    )
                    OR (
                        MAX(payment.created_at) IS NULL
                        AND sale.created_at <= NOW() - INTERVAL '30 days'
                    )
                )
            )
        `).setParameters({
            diario: 'diario',
            weekday,
            monthday,
        })
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
    async registerClientPayment(sale_id, registerPaymentDto) {
        const sale = await this.SaleRepository.findOne({
            where: { sale_id: sale_id },
            relations: ['client', 'product', 'payments'],
        });
        if (!sale) {
            throw new common_1.NotFoundException('Sale was not found');
        }
        const payment = this.PaymentRepository.create({
            sale,
            payment_date: registerPaymentDto.payment_date,
            payment_amount: registerPaymentDto.payment_amount,
        });
        const paymentIntegrity = await this.PaymentRepository.save(payment);
        await this.postPaymentSaleUpdate(sale.sale_id, payment.payment_amount);
        return paymentIntegrity;
    }
    async postPaymentSaleUpdate(sale_id, last_payment_amount) {
        const sale = await this.salesService.findSaleById(sale_id);
        const { number_of_payments, balance_amount } = sale;
        const newCantity = number_of_payments + 1;
        const newBalance = balance_amount - last_payment_amount;
        Object.assign(sale, {
            number_of_payments: newCantity,
            balance_amount: newBalance,
        });
        return this.SaleRepository.save(sale);
    }
    async postponePayment(sale_id, postponePaymentDto) {
        return await this.registerClientPayment(sale_id, postponePaymentDto);
    }
    async findPaymentById(payment_id) {
        const payment = await this.PaymentRepository.findOne({ where: { payment_id: payment_id }, relations: ['sale'] });
        if (!payment) {
            throw new common_1.NotFoundException(`The payment with id: ${payment_id} was not found.`);
        }
        return payment;
    }
    async deletePayment(payment_id) {
        const payment = await this.findPaymentById(payment_id);
        const sale = await this.salesService.findSaleById(payment.sale.sale_id);
        const { balance_amount } = sale;
        const { payment_amount } = payment;
        const newBalance = Number(balance_amount) + Number(payment_amount);
        const newCantity = (sale.number_of_payments - 1);
        Object.assign(sale, {
            number_of_payments: newCantity,
            balance_amount: newBalance,
        });
        await this.SaleRepository.save(sale);
        await this.PaymentRepository.remove(payment);
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
        typeorm_2.Repository,
        sales_service_1.SalesService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map