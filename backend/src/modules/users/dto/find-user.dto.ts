import { IsString, IsEmail, IsOptional } from 'class-validator'

export class findUserDto {
    @IsString()
    @IsOptional()
    username?:string;

    @IsString()
    @IsOptional()
    email?:string;
}