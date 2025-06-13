import { IsString, IsOptional, MinLength  } from 'class-validator'   

export class UpdateUsernameDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    username?: string;

}