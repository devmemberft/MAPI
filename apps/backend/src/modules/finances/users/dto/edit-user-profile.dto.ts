import { IsOptional, IsString } from "class-validator";

export class EditUserProfile {
    @IsString()
    @IsOptional()
    user_nickname:string;
}