import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { accountState, accountType } from "../account.entity";


export class AccountModificationDto{
    @IsString()
    @IsOptional()
    new_account_name:string;

    
    @IsOptional()
    @IsEnum(accountType)
    account_type:accountType;

    @IsOptional()
    @IsEnum(accountState)
    account_state:accountState;
}