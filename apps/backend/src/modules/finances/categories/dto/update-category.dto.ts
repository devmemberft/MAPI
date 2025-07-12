import { IsOptional,IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString()
    category_name?:string;

    @IsOptional()
    @IsString()
    category_description?:string;
}