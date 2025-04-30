import { GetTodayPaymentsDto } from './dto/get-payment.dto';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
export declare class PaymentsService {
    private PaymentRepository;
    constructor(PaymentRepository: Repository<Payment>);
    getTodayPayments(filters: GetTodayPaymentsDto): Promise<Payment[]>;
}
