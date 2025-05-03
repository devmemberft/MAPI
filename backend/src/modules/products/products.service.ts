import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)

        private productRepository:Repository<Product>
    ){}

    async createProduct(createProductDto:CreateProductDto):Promise<Product> {
        const {product_name} = createProductDto;
        if(await this.productRepository.findOneBy({product_name})) {throw new ConflictException(`Product ${product_name} already exists`);};
        const product = await this.productRepository.save(createProductDto);
        return product;
    }

    async updateProduct(product_name:string, updateProductDto:UpdateProductDto):Promise<Product> {
        const productExists = await this.findProductById(product_name);
        Object.assign(productExists,updateProductDto);
        await this.productRepository.save(productExists);
        return productExists;
    }

    async deleteProduct(product_name:string):Promise<void> {
        await this.productRepository.remove(await this.findProductByName(product_name));
    }

    async findAllProducts():Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findProductById(product_id:string):Promise<Product>{
        const product = await this.productRepository.findOneBy({product_id});
        if(!product) { throw new NotFoundException(`Product with id: ${product_id} not found.`);}
        return product;
    }

    async findProductByName(product_name:string):Promise<Product> {
        const product = await this.productRepository.findOne({ where:{product_name:product_name}, relations:['sales']}); // carga las relaciones si el producto tiene

        if(!product) { throw new NotFoundException(`Product with name ${product_name} not found.`); }
        return product;  
    }


}
