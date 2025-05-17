import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileFilterCallback } from "multer";
import { Request } from "express";
export declare const FileFilterExcel: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => void;
export declare const multerExcelOptions: MulterOptions;
