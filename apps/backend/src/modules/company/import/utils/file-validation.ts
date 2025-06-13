import { BadRequestException } from "@nestjs/common";
import { extname } from "path";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { FileFilterCallback } from "multer";
import { Request } from "express";

export const FileFilterExcel = (
    req:Request,
    file:Express.Multer.File,
    callback:FileFilterCallback,
):void => {
    
    if(!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new Error('Only .xlsx files are allowed') as any, false);
    }
    callback(null,true);
};

export const multerExcelOptions: MulterOptions = {
    limits: { fileSize: 3 * 1024 * 1024 }, // "3MB por archivo"
    fileFilter:FileFilterExcel,
}; 
