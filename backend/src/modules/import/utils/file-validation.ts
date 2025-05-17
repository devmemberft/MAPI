import { BadRequestException } from "@nestjs/common";
import { extname } from "path";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export const excelFileFilter = (req,file,callback) => {
    if(!file.originalname.match(/\.(xlsx)$/)) {
        return callback(new BadRequestException('Only .xlsx or .xls files are allowed'),false);
    }
    callback(null,true);
};

export const multerExcelOptions: MulterOptions = {
    fileFilter:excelFileFilter,
}; 
