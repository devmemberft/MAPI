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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSaleDto = void 0;
const class_validator_1 = require("class-validator");
class RegisterSaleDto {
    sale_id;
    sign;
    payment_day;
    payment_frecuency;
    number_of_payments;
    balance_amount;
    quota_value;
}
exports.RegisterSaleDto = RegisterSaleDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterSaleDto.prototype, "sale_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RegisterSaleDto.prototype, "sign", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({ lunes: 'lunes', martes: 'martes', miercoles: 'miercoles', jueves: 'jueves', viernes: 'viernes', sabado: 'sabado', domingo: 'domingo' }, { message: 'Must select one' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterSaleDto.prototype, "payment_day", void 0);
__decorate([
    (0, class_validator_1.IsEnum)({ diario: 'diario', semanal: 'semanal', quincenal: 'quincenal', mensual: 'mensual' }, { message: 'Must select one' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterSaleDto.prototype, "payment_frecuency", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RegisterSaleDto.prototype, "number_of_payments", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RegisterSaleDto.prototype, "balance_amount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RegisterSaleDto.prototype, "quota_value", void 0);
//# sourceMappingURL=register-sale.dto.js.map