import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImportService } from './import.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerExcelOptions } from './utils/file-validation';
import Multer from 'multer';

@Controller('import')
export class ImportController {
    constructor(private readonly importService:ImportService){}

    @Post()
    @UseInterceptors(FileInterceptor('file', multerExcelOptions))
    async ImportAllFromExcel(@UploadedFile() file: Express.Multer.File){
        if(!file) throw new BadRequestException('Not file uploaded');
        await this.importService.importExcel(file);
        return { message: 'The file was imported successfully.'};
    }
}
