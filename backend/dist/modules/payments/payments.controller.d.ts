import { PaymentsService } from './payments.service';
import { Payment } from './entities/payment.entity';
import { GetTodayPaymentsDto } from './dto/get-payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getTodayPayments(filters: GetTodayPaymentsDto): Promise<Payment[]>;
}
