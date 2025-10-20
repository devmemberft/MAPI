import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./tag.entity";
import { Repository } from "typeorm";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(Tag, 'accountingconnection')
        private readonly tagRepository: Repository<Tag>,
    ){}

    async create(createTagDto:CreateTagDto):Promise<Tag>{
        const checkExistence = await this.tagRepository.findOne({ where: { tag_name: createTagDto.tag_name} });
        if(checkExistence) { throw new ConflictException('The tag already exists.')};

        const tag = this.tagRepository.create(createTagDto);
        return this.tagRepository.save(tag);
    }

    async update(tag_id:string, updateTagDto:UpdateTagDto):Promise<Tag>{
        const tag = await this.findTagById(tag_id);
        Object.assign(tag,updateTagDto);
        return await this.tagRepository.save(tag);
    }

    async delete(tag_id:string):Promise<void>{
        const tag = await this.findTagById(tag_id);
        await this.tagRepository.remove(tag);
    }

    async findAll():Promise<Tag[]>{
        return this.tagRepository.find();
    }

    async findTagById(tag_id:string):Promise<Tag>{
        const tag = await this.tagRepository.findOneBy({tag_id});
        if(!tag) { throw new NotFoundException(`The tag with name: ${tag_id} was not found.`); }
        return tag;
    }

    async findTagByName(tag_name:string):Promise<Tag>{
        const tag = await this.tagRepository.findOneBy({tag_name});
        if(!tag) { throw new NotFoundException(`The tag with id: ${tag_name} was not found.`); }
        return tag;
    }

}