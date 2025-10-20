import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRegistrationDto } from "./dto/account-registration.dto";
import { AccountModificationDto } from "./dto/account-modification.dto";

@Injectable()
export class AccountService { // plan contable
    constructor(
        @InjectRepository(Account, 'accountingconnection')
        private readonly accountRepository:Repository<Account>
    ){}

    async registerAccount(accountRegistrationDto:AccountRegistrationDto):Promise<Account>{
        const checkAccount = await this.accountRepository.findOne({where:{account_name:accountRegistrationDto.account_name}});
        if(checkAccount) {throw new ConflictException('The account is already registered.'); }
        const newAccount = this.accountRepository.create(accountRegistrationDto);
        return this.accountRepository.save(newAccount);
    }

    async modifyAccount(account_name:string,accountModificationDto:AccountModificationDto):Promise<Account>{
        const { new_account_name } = accountModificationDto;
        
        const account = await this.findAccountByName(account_name);
        if(!account) {throw new NotFoundException(`The account with name: ${account_name} was not found.`); }
        
        if(account_name === new_account_name) { throw new ConflictException(`${new_account_name}: Invalid modification request, the name is the same. `); }
        if(await this.accountRepository.findOne({where:{account_name:new_account_name}})) {throw new ConflictException('The account is already registered.'); }

        Object.assign(account,{
            account_name: accountModificationDto.new_account_name,
            account_type: accountModificationDto.account_type,
            account_state: accountModificationDto.account_state,
        });
        await this.accountRepository.save(account);
        return this.accountRepository.findOneOrFail({where:{account_name}});
    }

    async deleteAccount(account_name:string):Promise<void>{
        const account = await this.findAccountByName(account_name);
        await this.accountRepository.remove(account);
    }
    
    async finAllAccounts():Promise<Account[]>{
        return await this.accountRepository.find();
    }
    
    async findAccountByName(account_name:string):Promise<Account>{
        const account = await this.accountRepository.findOne({where:{account_name}});
        if(!account) { throw new NotFoundException(`The account with name ${account_name} was not found. `); }
        return account;
    }
}