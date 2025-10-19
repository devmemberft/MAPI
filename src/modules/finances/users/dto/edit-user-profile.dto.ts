import { IsOptional, IsString } from "class-validator";

export class EditUserProfileDto {
    @IsString()
    user_nickname:string;
}