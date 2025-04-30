import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesService {
    private saleRepository;
    constructor(saleRepository: Repository<Sale>);
    registerSale(registerSaleDto: RegisterSaleDto): Promise<Sale>;
    updateSale(sale_id: string, updateSaleDto: UpdateSaleDto): Promise<Sale>;
    deleteSale(sale_id: string): Promise<void>;
    findAllSales(): Promise<Sale[]>;
    findSaleByFilter(sale_id: string): Promise<Sale>;
}
