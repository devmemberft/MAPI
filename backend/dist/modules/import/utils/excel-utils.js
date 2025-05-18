"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequiredString = getRequiredString;
exports.getRequiredNumber = getRequiredNumber;
exports.getEnumValue = getEnumValue;
exports.getRequiredDate = getRequiredDate;
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
    const raw = cell?.value?.toString().toLowerCase().trim();
    if (!raw || !Object.values(enumObj).includes(raw)) {
        throw new common_1.BadRequestException(`Invalid enum value at row ${row}, column ${col}. Expected one of: ${Object.values(enumObj).join(', ')}`);
    }
    return raw;
}
function getRequiredDate(cell, row, col) {
    if (!cell || cell.value == null) {
        throw new common_1.BadRequestException(`Invalid or missing date in row ${row}, column ${col}`);
    }
    const raw = cell.value;
    if (raw instanceof Date) {
        return raw;
    }
    if (typeof raw === 'string' || typeof raw === 'number') {
        const parsed = new Date(raw);
        if (isNaN(parsed.getTime())) {
            throw new common_1.BadRequestException(`Invalid date format in row ${row}, column ${col}: "${raw}"`);
        }
        return parsed;
    }
    throw new Error(`Unsupported date type in row ${row}, column ${col}: ${JSON.stringify(raw)}`);
}
//# sourceMappingURL=excel-utils.js.map