"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredString = getRequiredString;
exports.getRequiredNumber = getRequiredNumber;
exports.getEnumValue = getEnumValue;
const common_1 = require("@nestjs/common");
function getRequiredString(cell, row, col) {
    const value = cell?.value?.toString().trim();
    if (!value)
        throw new common_1.BadRequestException(`Missing required value at row ${row}, column ${col}.`);
    return value;
}
function getRequiredNumber(cell, row, col) {
    const value = cell.result ?? cell.value;
    if (value === null || value === undefined || isNaN(Number(value))) {
        throw new common_1.BadRequestException(`Invalid or missing number at row ${row}, column ${col}.`);
    }
    return Number(value);
}
function getEnumValue(cell, row, col, enumObj) {
    const raw = cell?.value?.toString().trim();
    if (!raw || !Object.values(enumObj).includes(raw)) {
        throw new common_1.BadRequestException(`Invalid enum value at row ${row}, column ${col}. Expected one of: ${Object.values(enumObj).join(', ')}`);
    }
    return raw;
}
//# sourceMappingURL=excel-utils.js.map