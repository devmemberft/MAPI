import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category,'accountingConnection')
        private readonly categoryRepository: Repository<Category>,
    ){}

    async create(createCategoryDto:CreateCategoryDto):Promise<Category>{
        const checkExistence = await this.categoryRepository.findOne({ where: { category_name: createCategoryDto.category_name} });
        if(checkExistence) { throw new ConflictException('The category already exists.')};

        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }

    async update(category_id:string, updateCategoryDto:UpdateCategoryDto):Promise<Category>{
        await this.categoryRepository.update(category_id,updateCategoryDto);
        return this.categoryRepository.findOneOrFail({where: {category_id}});
    }

    async delete(category_id:string):Promise<void>{
        await this.categoryRepository.delete(category_id);
    }

    async findAll():Promise<Category[]>{
        return this.categoryRepository.find();
    }

}