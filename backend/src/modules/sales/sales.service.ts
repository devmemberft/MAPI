import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
@Injectable()
export class SalesService {
    constructor(@InjectRepository(Sale) private saleRepository:Repository<Sale>){}


    async registerSale(registerSaleDto:RegisterSaleDto):Promise<Sale>{
        const newSale = await this.saleRepository.save(registerSaleDto);
        return newSale;
    }

    async updateSale(sale_id:string, updateSaleDto:UpdateSaleDto):Promise<Sale>{
        const checkExistence = await this.findSaleByFilter(sale_id);
        Object.assign(checkExistence,updateSaleDto);
        return this.saleRepository.save(checkExistence);
    }

    async deleteSale(sale_id:string):Promise<void>{
        const sale = await this.findSaleByFilter(sale_id);
        await this.saleRepository.delete(sale);
    }

    async findAllSales(){
        return await this.saleRepository.find();
    }

    async findSaleByFilter(sale_id:string):Promise<Sale>{
        const checkExistence = await this.saleRepository.findOneBy({sale_id});
        if(!checkExistence) { throw new NotFoundException('The sale was not found');}

        return checkExistence;
    }
}
