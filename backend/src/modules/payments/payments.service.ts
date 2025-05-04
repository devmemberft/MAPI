import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { Client } from '../clients/entities/client.entity';
import { paymentFrecuency } from './payment-frecuency.enum';


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

        const freqs = [
            paymentFrecuency.diario,
            paymentFrecuency.semanal,
            paymentFrecuency.quincenal,
            paymentFrecuency.mensual,
        ];
        
        const clients = await this.ClientRepository.createQueryBuilder('client')
        .leftJoinAndSelect('client.sales', 'sale')
        .leftJoinAndSelect('sale.payments', 'payment')
        .where('sale.payment_day = :day', {day: today})
        .andWhere('sale.payment_frecuency IN (:...freqs)', { freqs }) 
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

    async registerClientPayment(sale_id:string, registerPaymentDto:RegisterPaymentDto):Promise<Payment>{
        const sale = await this.SaleRepository.findOne({
            where: { sale_id:sale_id },
            relations: ['client','product','payments'],
        });

        if(!sale) { throw new NotFoundException('Sale not found'); }

        const existingPayment= await this.PaymentRepository.findOne({
            where:{
                sale:{sale_id:registerPaymentDto.sale_id},
            }
        })

        if(existingPayment){ throw new ConflictException('Payment was already registered.');}

        // Crear nuevo pago
        const payment = this.PaymentRepository.create({
            sale,
            payment_amount: registerPaymentDto.payment_amount,
            observation: registerPaymentDto.observation,
        });

        return await this.PaymentRepository.save(payment);
    }

    async postponePayment(sale_id:string,registerPaymentDto:RegisterPaymentDto):Promise<Payment>{
        return await this.registerClientPayment(sale_id,{...registerPaymentDto, payment_amount: 0});
    }

    async findPaymentById(payment_id:string):Promise<Payment>{
        const payment = await this.PaymentRepository.findOne({where:{payment_id:payment_id}, relations:['sale']});
        if(!payment) { throw new NotFoundException(`The payment with id: ${payment_id} was not found.`); }
        return payment;
    }

    async deletePayment(payment_id:string):Promise<void>{
        const payment = await this.findPaymentById(payment_id);
        await this.PaymentRepository.remove(payment);
    }
}
