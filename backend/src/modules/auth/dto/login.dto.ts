import { IsString, IsNotEmpty, IsEmail, Matches, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    @Matches(/(?=.*[A-Z])/, {message: 'Password must contain at least one uppercase letter'})
    password:string;
}