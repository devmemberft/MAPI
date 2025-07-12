import { IsOptional, IsString } from "class-validator";

export class RegisterUserAccessKeyDto {
    @IsString()
    @IsOptional()
    captcha_id:string;

    @IsString()
    captcha_value:string;
}