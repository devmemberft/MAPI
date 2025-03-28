import { IsString, IsEmail, IsNotEmpty, Length, MinLength  } from 'class-validator'   

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8,16)
    password: string;
}