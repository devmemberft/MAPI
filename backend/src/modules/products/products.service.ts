import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        if(product_name) {throw new BadRequestException(`Product ${product_name} already exists.`);}
        const product = await this.productRepository.save(createProductDto);
        return product;
    }

    async updateProduct(product_name:string, updateProductDto:UpdateProductDto):Promise<Product> {
        const productExists = await this.findProductByName(product_name);
        Object.assign(productExists,updateProductDto);
        await this.productRepository.save(productExists);
        return productExists;
    }

    async deleteProduct(product_name:string):Promise<void> {
        const product = await this.findProductByName(product_name);
        await this.productRepository.delete(product);
    }

    async findAllProducts():Promise<Product[]> {
        return await this.productRepository.find();
    }

    async findProductByName(product_name:string) {
        const product = await this.productRepository.findOneBy({product_name});
        if(!product) { throw new NotFoundException(`Product ${product_name} not found.`); }
        return product;  
    }

}
