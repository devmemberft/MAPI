import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { Tag } from '../tags/tag.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionType } from './transaction.entity';
import { User } from '../users/user.entity';
import { Account } from '../accounts/account.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction, 'accountingConnection')
        private readonly transactionRepository: Repository<Transaction>,
    
        @InjectRepository(Tag,'accountingConnection')
        private readonly tagRepository:Repository<Tag>,

        @InjectRepository(User,'accountingConnection')
        private readonly userRepository:Repository<User>,

        @InjectRepository(Account,'accountingConnection')
        private readonly accountRepository:Repository<Account>,
    ){}

    async create(createTransactionDto:CreateTransactionDto):Promise<Transaction> {
        const user = await this.userRepository.findOneBy({user_id:createTransactionDto.user_id});
        if(!user) { throw new NotFoundException('The user was not found during the transaction creation. '); }

        const account = await this.accountRepository.findOneBy({account_id:createTransactionDto.account_id});
        if(!account) { throw new NotFoundException('The account plan was not found during the transaction creation. '); }

        const newTransaction = new Transaction();
        newTransaction.user = {...user};
        newTransaction.account = account;
        newTransaction.transaction_type = createTransactionDto.transaction_type;
        newTransaction.transaction_amount = createTransactionDto.transaction_amount;
        newTransaction.transaction_description = createTransactionDto.transaction_description;
        
        return await this.transactionRepository.save(newTransaction);
    }
    
    async update(transaction_id:string,updateTransactionDto:UpdateTransactionDto):Promise<Transaction>{
        const transaction = await this.findOneTransactionById(transaction_id);
        Object.assign(transaction,updateTransactionDto);
        await this.transactionRepository.save(transaction);
        return this.transactionRepository.findOneOrFail({where:{transaction_id}});
    }
    
    async delete(transaction_id:string):Promise<void>{
        const transaction = await this.findOneTransactionById(transaction_id);
        await this.transactionRepository.remove(transaction);
    }

    async findAll():Promise<Transaction[]>{
        return this.transactionRepository.find();
    }

    async findOneTransactionById(transaction_id:string):Promise<Transaction>{
        const transaction = await this.transactionRepository.findOneBy({transaction_id:transaction_id});
        if(!transaction) { throw new NotFoundException(`The transaction was not found. `); }
        return transaction;
    }

    async findTransactionsByType(transaction_type:TransactionType):Promise<Transaction[]>{
        const [] = await this.transactionRepository.findBy({transaction_type});
        const transactions = [];
        if(!transactions) { throw new NotFoundException(`Transactions with type ${transaction_type} were not found.`); }
        return transactions;
    }
}


/* */

/*
if(createTransactionDto.tag_id){
    const tag = await this.tagRepository.findOne({ where: {tag_id: createTransactionDto.tag_id }});
    if(!tag){ throw new NotFoundException('The tag was not found. ');}

    newTransaction.tags = tag;
}


async filter(filterTransactionsDto:FilterTransactionsDto):Promise<Transaction>{
    return await this.transactionRepository.findAndCountBy(filterTransactionsDto);
}
    */