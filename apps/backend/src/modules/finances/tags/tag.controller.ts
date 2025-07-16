    import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { TagService } from "./tag.service";
import { Tag } from "./tag.entity";
import { CreateTagDto } from "./dto/create-tag.dto";
import { UpdateTagDto } from "./dto/update-tag.dto";

@Controller('finances/tags')
export class TagController {
    constructor(
        private readonly tagService:TagService,
    ){}

    @Post('add-tag')
    async create(@Body() createTagDto:CreateTagDto):Promise<Tag>{
        return await this.tagService.create(createTagDto);
    }

    @Patch('update-tag') // bug
    async update(@Query('tag_id') tag_id:string, @Body() updateTagDto:UpdateTagDto):Promise<Tag>{
        return await this.tagService.update(tag_id,updateTagDto);
    }

    @Delete('delete-tag')
    async delete(@Query('tag_id') tag_id:string):Promise<void>{
        return await this.tagService.delete(tag_id);
    }

    @Get()
    async findAll():Promise<Tag[]>{
        return await this.tagService.findAll();
    }
}