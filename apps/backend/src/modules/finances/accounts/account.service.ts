import { ConflictException, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Account } from "./account.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRegistrationDto } from "./dto/account-registration.dto";
import { AccountModificationDto } from "./dto/account-modification.dto";

@Injectable()
export class AccountService { // plan contable
    constructor(
        @InjectRepository(Account,'accountingConnection')
        private readonly accountRepository:Repository<Account>
    ){}

    async registerAccount(accountRegistrationDto:AccountRegistrationDto):Promise<Account>{
        const checkAccount = await this.accountRepository.findOne({where:{account_name:accountRegistrationDto.account_name}});
        if(checkAccount) {throw new ConflictException('The account is already registered.'); }
        const newAccount = this.accountRepository.create(accountRegistrationDto);
        return this.accountRepository.save(newAccount);
    }

    async modifyAccount(account_name:string,accountModificationDto:AccountModificationDto):Promise<Account>{
        const checkAccount = await this.accountRepository.findOne({where:{account_name}});
        if(checkAccount) {throw new ConflictException(`The account with name: ${account_name} was not found.`); }
        
        await this.accountRepository.update(account_name,accountModificationDto);
        return this.accountRepository.findOneOrFail({where:{account_name}});
    }

    async deleteAccount(account_id:string):Promise<void>{
        await this.accountRepository.delete(account_id);
    }

    async finAllAccounts():Promise<Account[]>{
        return await this.accountRepository.find();
    }
}