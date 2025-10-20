import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { Account } from "./account.entity";
import { AccountService } from "./account.service";
import { AccountRegistrationDto } from "./dto/account-registration.dto";
import { AccountModificationDto } from "./dto/account-modification.dto";

@Controller('finances/accounts')
export class AccountController {
    constructor(
        private readonly accountService:AccountService,
    ){}

    @Post('register-account')
    async registerAccount(@Body() accountRegistrationDto:AccountRegistrationDto):Promise<Account>{
        return await this.accountService.registerAccount(accountRegistrationDto);
    }

    @Patch('modify') //modificacion parcial de informacion
    async modifyAccount(@Query('account_name') account_name:string, @Body() accountModificationDto:AccountModificationDto):Promise<Account>{
        return await this.accountService.modifyAccount(account_name,accountModificationDto);
    }

    @Delete('delete')
    async deleteAccount(@Query('account_name') account_name:string):Promise<void>{
        return await this.accountService.deleteAccount(account_name);
    }

    @Get()
    async findAllAccounts():Promise<Account[]>{
        return await this.accountService.finAllAccounts();
    }

    @Get()
    async findAccountByName(@Query('account_name') account_name:string):Promise<Account>{
        return await this.accountService.findAccountByName(account_name); 
    }
}