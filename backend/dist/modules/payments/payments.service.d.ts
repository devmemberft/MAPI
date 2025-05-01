import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Sale } from '../sales/entities/sale.entity';
import { RegisterPaymentDto } from './dto/create-payment.dto';
import { Client } from '../clients/entities/client.entity';
export declare class PaymentsService {
    private PaymentRepository;
    private SaleRepository;
    private ClientRepository;
    constructor(PaymentRepository: Repository<Payment>, SaleRepository: Repository<Sale>, ClientRepository: Repository<Client>);
    private getToday;
    buildDailyRoute(): Promise<Client[]>;
    private sortClients;
    registerClientPayment(registerPaymentDto: RegisterPaymentDto): Promise<Payment>;
    postponePayment(registerPaymentDto: RegisterPaymentDto): Promise<Payment>;
}
