import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { GetTodayPaymentsDto } from './dto/get-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class PaymentsService {

    constructor(@InjectRepository(Payment) private PaymentRepository:Repository<Payment>,){}

    async getTodayPayments(filters:GetTodayPaymentsDto){
        const today = new Date().toISOString().split('T')[0];

        const query = this.PaymentRepository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.sale', 's')
            .leftJoinAndSelect('s.client','c')
            .where('p.payment_date = :today', { today });

        if(filters.client_zone !== undefined){
            query.andWhere('c.client_zone= :zone', { zone: filters.client_zone});
        }

        if(filters.client_address){
            query.andWhere('LOWER(c.client_address) LIKE LOWER(:addr)', { addr: `%${filters.client_address}%`,});
        }

        return query.getMany();
    }
    /*
    async updatePayment(id:string, dto:UpdatePaymentDto){
        const payment= await this.PaymentRepository.findOne({where:{payment_id:id}, relations:['sale'],});

        if (!payment) { throw new NotFoundException('Pago no encontrado.');}

        // Validacion: pago no debe exceder saldo
        if(dto.payment_made && dto.payment_amount? > payment.sale.balance_amount){
            throw new BadRequestException('El pago excede el saldo pendiente');
        }

        // Actualizar pago
        payment.payment_made = dto.payment_made;
        payment.payment_amount = dto.payment_amount ?? 0;
        payment.observation = dto.observation ?? null;

        await this.PaymentRepository.save(payment);

        // Si el pago fue realizado, actualizamos la venta
        if(dto.payment_made){
            payment.sale.number_of_payments += 1;
            payment.sale.balance_amount -= payment.payment_amount;
            await this.saleRepository.save(payment.sale):
        }

        return payment;
    }
    */
}
