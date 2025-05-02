import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale)

        private saleRepository:Repository<Sale>,
        private clientsService:ClientsService,
        private productsService:ProductsService,
    ){}

    async registerSale(client_dni:number, product_id:string, registerSaleDto:RegisterSaleDto):Promise<Sale>{
        const checkClientExistence = await this.clientsService.findClientByDni(client_dni);
        const checkProductExistence = await this.productsService.findProductById(product_id);
        if(!checkClientExistence || !checkProductExistence) { throw new NotFoundException('Item not found');}

        const newSale = new Sale();
        newSale.products = [checkProductExistence]; // verificar si montar uno o  varios productos por venta
        newSale.client = checkClientExistence;
        newSale.sign = registerSaleDto.sign;
        newSale.payment_frecuency = registerSaleDto.payment_frecuency;
        newSale.payment_day = registerSaleDto.payment_day;
        newSale.quota_value = registerSaleDto.quota_value;
        newSale.number_of_payments = registerSaleDto.number_of_payments;
        newSale.balance_amount = registerSaleDto.balance_amount;

        return await this.saleRepository.save(newSale);
    }

    async updateSale(sale_id:string, updateSaleDto:UpdateSaleDto):Promise<Sale>{
        const sale = await this.findSaleById(sale_id);

        Object.assign(sale, {
            payment_frecuency: updateSaleDto.payment_frecuency,
            payment_day: updateSaleDto.payment_day,
            // agregar mas en caso de ser necesario
        });
        return this.saleRepository.save(sale);
    }

    async deleteSale(sale_id:string):Promise<void>{
        const sale = await this.findSaleById(sale_id);
        await this.saleRepository.delete(sale);
    }

    async findAllSales(){
        return await this.saleRepository.find();
    }

    async findSaleById(sale_id:string):Promise<Sale>{
        const checkExistence = await this.saleRepository.findOneBy({sale_id});
        if(!checkExistence) { throw new NotFoundException(`The sale with id: ${sale_id} was not found`);}

        return checkExistence;
    }
}
