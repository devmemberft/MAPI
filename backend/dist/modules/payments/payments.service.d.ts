import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { RegisterPaymentDto } from './dto/register-payment.dto';
import { Client } from '../clients/entities/client.entity';
import { SalesService } from '../sales/sales.service';
import { PostponePaymentDto } from './dto/postpone-payment.dto';
export declare class PaymentsService {
    private PaymentRepository;
    private SaleRepository;
    private ClientRepository;
    private salesService;
    constructor(PaymentRepository: Repository<Payment>, SaleRepository: Repository<Sale>, ClientRepository: Repository<Client>, salesService: SalesService);
    private getToday;
    buildDailyRoute(): Promise<Client[]>;
    private sortClients;
    registerClientPayment(sale_id: string, registerPaymentDto: RegisterPaymentDto): Promise<Payment>;
    postPaymentSaleUpdate(sale_id: string, last_payment_amount: number): Promise<Sale>;
    postponePayment(sale_id: string, postponePaymentDto: PostponePaymentDto): Promise<Payment>;
    findPaymentById(payment_id: string): Promise<Payment>;
    deletePayment(payment_id: string): Promise<void>;
}
