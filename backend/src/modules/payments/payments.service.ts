import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { Client } from '../clients/entities/client.entity';
import { paymentFrecuency } from './payment-frecuency.enum';
import { SalesService } from '../sales/sales.service';
import { PostponePaymentDto } from './dto/postpone-payment.dto';


@Injectable()
export class PaymentsService {

    constructor(
        @InjectRepository(Payment)
        private PaymentRepository:Repository<Payment>,

        @InjectRepository(Sale)
        private SaleRepository:Repository<Sale>,

        @InjectRepository(Client)
        private ClientRepository:Repository<Client>,

        private salesService:SalesService,
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
        .leftJoin('sale.payments', 'payment')
        .groupBy('client.client_id')
        .addGroupBy('sale.sale_id')
        .having(`
            (
                sale.payment_frecuency = :diario
            )
            OR(
                sale.payment_frecuency = :semanal
                AND sale.payment_day = :today
                AND (
                    (MAX(payment.created_at) IS NOT NULL AND MAX(payment.created_at) <= NOW() - INTERVAL '7 days')
                    OR (MAX(payment.created_at) IS NOT NULL AND sale.created_at <= NOW() - INTERVAL '7 days')
                )
                
            )
            OR(
                sale.payment_frecuency = :quincenal
                AND sale.payment_day= :today
                AND (
                    (MAX(payment.created_at) IS NOT NULL AND MAX(payment.created_at) <= NOW() - INTERVAL '15 days')
                    OR (MAX(payment.created_at) IS NOT NULL AND sale.created_at <= NOW() - INTERVAL '15 days')
                )
            )
            OR(
                sale.payment_frecuency = :mensual
                AND sale.payment_day= :today
                AND (
                    (MAX(payment.created_at) IS NOT NULL AND MAX(payment.created_at) <= NOW() - INTERVAL '30 days')
                    OR (MAX(payment.created_at) IS NOT NULL AND sale.created_at <= NOW() - INTERVAL '30 days')
                )
            )
        `).setParameters({
            diario:'diario',
            semanal:'semanal',
            quincenal:'quincenal',
            mensual:'mensual',
            today,
        })
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

        if(!sale) { throw new NotFoundException('Sale was not found'); }

        const existingPayment= await this.PaymentRepository.findOne({
            where:{
                sale:{sale_id:sale_id},
            }
        })

        if(existingPayment){ throw new ConflictException('Payment was already registered today.');}

        // Crear nuevo pago
        const payment = this.PaymentRepository.create({
            sale,
            payment_amount: registerPaymentDto.payment_amount,
            observation: registerPaymentDto.observation,
        });

        // verificar integridad del pago
        const paymentIntegrity = await this.PaymentRepository.save(payment);

        // actualizar informacion de la venta
        await this.postPaymentSaleUpdate(sale.sale_id, payment.payment_amount);

        return paymentIntegrity;
    }


    async postPaymentSaleUpdate(sale_id:string, last_payment_amount:number):Promise<Sale>{
        const sale = await this.salesService.findSaleById(sale_id);
        const { number_of_payments, balance_amount } = sale;
        const newCantity = number_of_payments + 1;
        const newBalance  = balance_amount - last_payment_amount;

        Object.assign(sale,{
            number_of_payments: newCantity,
            balance_amount: newBalance,
        });
        return this.SaleRepository.save(sale);
    }

    async postponePayment(sale_id:string,postponePaymentDto:PostponePaymentDto):Promise<Payment>{
        return await this.registerClientPayment(sale_id,postponePaymentDto);
    }

    async findPaymentById(payment_id:string):Promise<Payment>{
        const payment = await this.PaymentRepository.findOne({where:{payment_id:payment_id}, relations:['sale']});
        if(!payment) { throw new NotFoundException(`The payment with id: ${payment_id} was not found.`); }
        return payment;
    }

    async deletePayment(payment_id:string):Promise<void>{
        const payment = await this.findPaymentById(payment_id);
        // encontrar relacion con la venta
        const sale = await this.salesService.findSaleById(payment.sale.sale_id);
        // disminuir la cantidad del pago del balance de la venta
        const { balance_amount } = sale;
        const { payment_amount } = payment;
        const newBalance = Number(balance_amount) + Number(payment_amount);
        // disminuir en 1 el numero de pagos realizados
        const newCantity =  (sale.number_of_payments - 1);
        Object.assign(sale,{
            number_of_payments: newCantity,
            balance_amount: newBalance,
        });

        await this.SaleRepository.save(sale);

        await this.PaymentRepository.remove(payment);
    }
}
