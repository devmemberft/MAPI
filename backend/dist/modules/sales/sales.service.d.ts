import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { ClientsService } from '../clients/clients.service';
import { ProductsService } from '../products/products.service';
import { RegisterSaleDto } from './dto/register-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesService {
    private saleRepository;
    private clientsService;
    private productsService;
    constructor(saleRepository: Repository<Sale>, clientsService: ClientsService, productsService: ProductsService);
    registerSale(client_dni: string, product_id: string, registerSaleDto: RegisterSaleDto): Promise<Sale>;
    updateSale(sale_id: string, updateSaleDto: UpdateSaleDto): Promise<Sale>;
    deleteSale(sale_id: string): Promise<void>;
    findAllSales(): Promise<Sale[]>;
    findSaleById(sale_id: string): Promise<Sale>;
}
