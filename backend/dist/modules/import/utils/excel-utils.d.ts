import * as ExcelJS from 'exceljs';
export declare function getRequiredString(cell: ExcelJS.Cell, row: number, col: number): string;
export declare function getRequiredNumber(cell: ExcelJS.Cell, row: number, col: number): number;
export declare function getEnumValue<T extends Record<string, string | number>>(cell: ExcelJS.Cell, row: number, col: number, enumObj: T): T[keyof T];
export declare function getRequiredDate(cell: ExcelJS.Cell, row: number, col: number): Date;
