import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesController {
    private salesService;
    constructor(salesService: SalesService);
    registerSale(client_dni: string, product_id: string, registerSaleDto: RegisterSaleDto): Promise<Sale>;
    updateSale(sale_id: string, updateSaleDto: UpdateSaleDto): Promise<Sale>;
    deleteSale(sale_id: string): Promise<void>;
    findAllSales(): Promise<Sale[]>;
    findSaleById(sale_id: string): Promise<Sale>;
}
