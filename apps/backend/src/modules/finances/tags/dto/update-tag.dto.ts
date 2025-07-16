import { IsOptional,IsString } from "class-validator";

export class UpdateTagDto {
    @IsOptional()
    @IsString()
    tag_name:string;
}