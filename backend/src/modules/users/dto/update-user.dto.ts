import { IsString, IsEmail, IsOptional, Length, MinLength  } from 'class-validator'   

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    username?: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @Length(8,16)
    password?: string;
}