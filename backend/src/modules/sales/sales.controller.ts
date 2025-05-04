import { Controller, Get, Post, Put, Delete, Body, Param, } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
    constructor(private salesService:SalesService) {}
    
    @Post('register')
    async registerSale(@Param('client_dni') client_dni:string, @Param('product_id') product_id:string, @Body() registerSaleDto:RegisterSaleDto):Promise<Sale>{
        return await this.salesService.registerSale(client_dni, product_id, registerSaleDto);
    }

    @Put('update')
    async updateSale(@Param('sale_id') sale_id:string, @Body() updateSaleDto:UpdateSaleDto):Promise<Sale>{
        return await this.salesService.updateSale(sale_id, updateSaleDto);
    }

    @Delete('delete')
    async deleteSale(@Param('sale_id') sale_id:string):Promise<void>{ return await this.salesService.deleteSale(sale_id); }

    @Get()
    async findAllSales():Promise<Sale[]>{ return await this.salesService.findAllSales(); }

    @Get(':sale')
    async findSaleById(@Param('sale_id') sale_id:string):Promise<Sale>{
        return await this.salesService.findSaleById(sale_id);
    }
}
