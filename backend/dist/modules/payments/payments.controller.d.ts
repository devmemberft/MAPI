import { PaymentsService } from './payments.service';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { PostponePaymentDto } from './dto/postpone-payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getDailyRoute(): Promise<import("../clients/entities/client.entity").Client[]>;
    registerPayment(sale_id: string, registerPaymentDto: RegisterPaymentDto): Promise<import("./entities/payment.entity").Payment>;
    postponePayment(sale_id: string, postponePaymentDto: PostponePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    getPaymentById(payment_id: string): Promise<import("./entities/payment.entity").Payment>;
    deletePayment(payment_id: string): Promise<void>;
}
