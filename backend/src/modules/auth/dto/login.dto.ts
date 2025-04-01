import { IsString, IsNotEmpty } from 'class-validator'

export class LoginUserDto {

    @IsString()
    @IsNotEmpty()
    id:string;

    @IsString()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}