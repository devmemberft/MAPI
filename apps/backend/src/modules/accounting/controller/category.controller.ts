import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CategoryService } from "../service/category.service";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto } from "../dto/create-category";
import { UpdateCategoryDto } from "../dto/update-category.dto";

@Controller('categories')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService,
    ){}

    @Post('create')
    async create(@Body() createCategoryDto:CreateCategoryDto):Promise<Category>{
        return await this.categoryService.create(createCategoryDto);
    }

    @Patch('update/:id')
    async update(@Param('category_id') category_id:string, @Body() updateCategorDto:UpdateCategoryDto):Promise<Category>{
        return await this.categoryService.update(category_id,updateCategorDto);
    }

    @Delete('delete/:id')
    async delete(@Param('category_id') category_id:string):Promise<void>{
        return await this.categoryService.delete(category_id);
    }

    @Get()
    async findAll():Promise<Category[]>{
        return await this.categoryService.findAll();
    }
}