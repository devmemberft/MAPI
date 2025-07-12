import { IsString } from "class-validator";

export class loginUserAccessKeyDto {
    @IsString()
    access_key:string;
}