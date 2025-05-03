import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private productsService:ProductsService,) {}

    @Post('add')
    async createProduct(@Body() createProductDto:CreateProductDto):Promise<Product> {
        return await this.productsService.createProduct(createProductDto);
    }

    @Put('update')
    async updateProduct(@Param('product_name') product_name:string, @Body() updateProductDto:UpdateProductDto):Promise<Product> {
        return await this.productsService.updateProduct(product_name,updateProductDto);
    }

    @Delete('delete')
    async deleteProduct(@Param('product_name') product_name:string):Promise<void> {
        return await this.productsService.deleteProduct(product_name);
    }

    @Get()
    async findAllProducts():Promise<Product[]> {
        return await this.productsService.findAllProducts();
    }

    @Get(':id')
    async findProductById(@Param('product_id') product_id:string):Promise<Product>{
        return await this.productsService.findProductById(product_id);
    }

    @Get(':name')
    async findProductByName(@Param('product_name') product_name:string):Promise<Product> {
        return await this.productsService.findProductByName(product_name);
    }
}
