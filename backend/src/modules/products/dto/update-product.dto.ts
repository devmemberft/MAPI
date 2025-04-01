import { IsString, IsNumber, IsOptional } from 'class-validator'

export class UpdateProductDto {

    @IsString()
    @IsOptional()
    name?:string;

    @IsString()
    @IsOptional()
    category?:string;

    @IsNumber()
    @IsOptional()
    amount?:number; 

    @IsString()
    @IsOptional()
    color?:string; 
}