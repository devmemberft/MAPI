import { PaymentsService } from './payments.service';
import { RegisterPaymentDto } from './dto/create-payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    getDailyRoute(): Promise<import("../clients/entities/client.entity").Client[]>;
    registerPayment(registerPaymentDto: RegisterPaymentDto): Promise<import("./entities/payment.entity").Payment>;
    postponePayment(registerPaymentDto: RegisterPaymentDto): Promise<import("./entities/payment.entity").Payment>;
}
