import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
export declare class ProductsService {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(product_id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(product_name: string): Promise<void>;
    findAllProducts(): Promise<Product[]>;
    findProductById(product_id: string): Promise<Product>;
    findProductByName(product_name: string): Promise<Product>;
}
