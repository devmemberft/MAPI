import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { CategoryService } from "../categories/category.service";
import { Category } from "../categories/category.entity";
import { CreateCategoryDto } from "../categories/dto/create-category.dto";
import { UpdateCategoryDto } from "../categories/dto/update-category.dto";

@Controller('finances/categories')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService,
    ){}

    @Post('create-category')
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