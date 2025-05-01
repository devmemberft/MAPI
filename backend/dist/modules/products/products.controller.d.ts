import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(product_name: string, updateProductDto: UpdateProductDto): Promise<Product>;
    deleteProduct(product_name: string): Promise<void>;
    findAllProducts(): Promise<Product[]>;
    findProductById(product_id: string): Promise<Product>;
    findProductByName(product_name: string): Promise<Product>;
}
