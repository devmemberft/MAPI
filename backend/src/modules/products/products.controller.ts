import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateResult } from 'typeorm';

@Controller('products')
export class ProductsController {

    constructor(private productsService:ProductsService,) {}

    @Post()
    async createProduct(createProductDto:CreateProductDto):Promise<Product> {
        return await this.productsService.createProduct(createProductDto);
    }

    @Put()
    async updateProduct(product_name:string, updateProductDto:UpdateProductDto):Promise<Product> {
        return await this.productsService.updateProduct(product_name,updateProductDto);
    }

    @Delete()
    async deleteProduct(product_name:string):Promise<void> {
        return await this.productsService.deleteProduct(product_name);
    }

    @Get()
    async findAllProducts():Promise<Product[]> {
        return await this.productsService.findAllProducts();
    }

    @Get(':id')
    async findProductById(product_id:string):Promise<Product>{
        return await this.productsService.findProductById(product_id);
    }

    @Get(':name')
    async findProductByName(product_name:string):Promise<Product> {
        return await this.productsService.findProductByName(product_name);
    }
}
