import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { RegisterPaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Client } from '../clients/entities/client.entity';
import { register } from 'module';


@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Payment)
        private PaymentRepository:Repository<Payment>,

        @InjectRepository(Sale)
        private SaleRepository:Repository<Sale>,

        @InjectRepository(Client)
        private ClientRepository:Repository<Client>,
    ){}

    private getToday():string{
        return ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'][new Date().getDay()];
    }

    
    async buildDailyRoute():Promise<Client[]>{
        const today = this.getToday();
        
        const clients = await this.ClientRepository.createQueryBuilder('client')
        .leftJoinAndSelect('client.sales', 'sale')
        .leftJoinAndSelect('sale.payments', 'payment')
        .where('sale.payment_day = :day', {today})
        .andWhere('sale.payment_frecuency = :freq', {freq: 'diario'}) // extender si es necesario  (semanal, quincenal,etc)
        .getMany();
        
        return this.sortClients(clients);
    }
    
    private sortClients(clients: Client[]): Client[] {
        return clients.sort((a, b) => {
            const zoneCompare = a.client_zone.localeCompare(b.client_zone);
            if(zoneCompare !== 0) return zoneCompare;

            return a.client_address.localeCompare(b.client_address);
        });
    }

    async registerClientPayment(registerPaymentDto:RegisterPaymentDto):Promise<Payment>{
        const sale = await this.SaleRepository.findOne({
            where: { sale_id:registerPaymentDto.sale_id},
            relations: ['client','payments'],
        });

        if(!sale) { throw new NotFoundException('Sale not found'); }

        const existingPayment= await this.PaymentRepository.findOne({
            where:{
                sale:{sale_id:registerPaymentDto.sale_id},
                payment_date:new Date(registerPaymentDto.payment_date),
            }
        })

        if(existingPayment){ throw new ConflictException('Payment was already registered.');}

        // Crear nuevo pago
        const payment = this.PaymentRepository.create({
            sale,
            payment_date:new Date(registerPaymentDto.payment_date),
            payment_amount: registerPaymentDto.payment_amount,
            observation: registerPaymentDto.observation,
        });

        return await this.PaymentRepository.save(payment);
    }

    async postponePayment(registerPaymentDto:RegisterPaymentDto):Promise<Payment>{
        return await this.registerClientPayment({...registerPaymentDto, payment_amount: 0});
    }
}
