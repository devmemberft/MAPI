import { IsEnum, IsNumber, IsString } from "class-validator";
import { accountState, accountType } from "../account.entity";

export class AccountRegistrationDto{
    @IsString()
    account_name:string;

    @IsEnum(accountType)
    account_type:accountType;

    @IsEnum(accountState)
    account_state:accountState;
}