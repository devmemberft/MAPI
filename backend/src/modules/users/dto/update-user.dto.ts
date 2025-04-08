import { IsString, IsEmail, IsOptional, IsNotEmpty, Matches, MaxLength, MinLength  } from 'class-validator'   

export class UpdateUserDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    @Matches(/(?=.*[A-Z])/, {message: 'Password must contain at least one uppercase letter'})
    password?: string;

    @IsString()
    @IsNotEmpty()
    role:string;
}