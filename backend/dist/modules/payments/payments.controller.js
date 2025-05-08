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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const register_payment_dto_1 = require("./dto/register-payment.dto");
const postpone_payment_dto_1 = require("./dto/postpone-payment.dto");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async getDailyRoute() {
        return await this.paymentsService.buildDailyRoute();
    }
    async registerPayment(sale_id, registerPaymentDto) {
        return await this.paymentsService.registerClientPayment(sale_id, registerPaymentDto);
    }
    async postponePayment(sale_id, postponePaymentDto) {
        return await this.paymentsService.postponePayment(sale_id, postponePaymentDto);
    }
    async getPaymentById(payment_id) {
        return await this.paymentsService.findPaymentById(payment_id);
    }
    async deletePayment(payment_id) {
        return await this.paymentsService.deletePayment(payment_id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Get)('daily-route'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getDailyRoute", null);
__decorate([
    (0, common_1.Post)('register/:sale_id'),
    __param(0, (0, common_1.Param)('sale_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, register_payment_dto_1.RegisterPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "registerPayment", null);
__decorate([
    (0, common_1.Post)('postpone/:sale_id'),
    __param(0, (0, common_1.Param)('sale_id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, postpone_payment_dto_1.PostponePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "postponePayment", null);
__decorate([
    (0, common_1.Get)(':payment_id'),
    __param(0, (0, common_1.Param)('payment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "getPaymentById", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Param)('payment_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "deletePayment", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map