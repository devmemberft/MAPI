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

    async registerSale(client_dni:string, product_id:string, registerSaleDto:RegisterSaleDto):Promise<Sale>{
        const client = await this.clientsService.findClientByDni(client_dni);
        const product = await this.productsService.findProductById(product_id);
        if(!client || !product) { throw new NotFoundException('Item not found');}

        const newSale = new Sale();
        newSale.product = product; // un producto por venta
        newSale.client = client;
        newSale.sign = registerSaleDto.sign;
        newSale.payment_frecuency = registerSaleDto.payment_frecuency;
        newSale.payment_day = registerSaleDto.payment_day;
        newSale.number_of_payments;
        newSale.quota_value = registerSaleDto.quota_value;
        newSale.total_sale = product.product_price;
        newSale.balance_amount = (newSale.total_sale - registerSaleDto.sign);
        
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

        sale.product=null;
        await this.saleRepository.save(sale);

        await this.saleRepository.remove(sale);
    }

    async findAllSales(){ return await this.saleRepository.find({relations:['product','client','payments']}); }

    async findSaleById(sale_id:string):Promise<Sale>{
        const checkExistence = await this.saleRepository.findOne({ where:{sale_id:sale_id}, relations:['client','product','payments']});
        if(!checkExistence) { throw new NotFoundException(`The sale with id: ${sale_id} was not found`);}

        return checkExistence;
    }
}

