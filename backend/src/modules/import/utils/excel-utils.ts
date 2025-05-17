import { BadRequestException } from "@nestjs/common";
import * as ExcelJS from 'exceljs';

export function getRequiredString(cell: ExcelJS.Cell, row: number, col: number): string {
  const value = cell?.value?.toString().trim();
  if (!value) throw new BadRequestException(`Missing required value at row ${row}, column ${col}.`);
  return value;
}

export function getRequiredNumber(cell: ExcelJS.Cell, row: number, col: number): number {
  const value = (cell as any).result ?? cell.value;
  if (value === null || value === undefined || isNaN(Number(value))) {
    throw new BadRequestException(`Invalid or missing number at row ${row}, column ${col}.`);
  }
  return Number(value);
}

export function getEnumValue<T extends Record<string, string | number >>(cell: ExcelJS.Cell, row: number, col: number, enumObj: T): T[keyof T] {
  const raw = cell?.value?.toString().trim();
  if (!raw || !Object.values(enumObj).includes(raw as any)) {
    throw new BadRequestException(`Invalid enum value at row ${row}, column ${col}. Expected one of: ${Object.values(enumObj).join(', ')}`);
  }
  return raw as T[keyof T];
}
