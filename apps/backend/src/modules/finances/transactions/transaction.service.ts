import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';
import { Category } from '../categories/category.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction, 'accountingConnection')
        private readonly transactionRepository: Repository<Transaction>,
    
        @InjectRepository(Category,'accountingConnection')
        private readonly categoryRepository:Repository<Category>,
    ){}

    async create(createTransactionDto:CreateTransactionDto):Promise<Transaction> {
        const newTransaction = new Transaction();
        newTransaction.transaction_type = createTransactionDto.transaction_type;
        newTransaction.transaction_amount = createTransactionDto.transaction_amount;
        newTransaction.transaction_description = createTransactionDto.transaction_description;
        if(createTransactionDto.category_id){
            const category = await this.categoryRepository.findOne({ where: {category_id: createTransactionDto.category_id }});
            if(!category){ throw new NotFoundException('The category was not found. ');}

            newTransaction.category = category;
        }

        return await this.transactionRepository.save(newTransaction);
    }

    async update(transaction_id:string,updateTransactionDto:UpdateTransactionDto):Promise<Transaction>{
        await this.transactionRepository.update(transaction_id,updateTransactionDto);
        return this.transactionRepository.findOneOrFail({where:{transaction_id}});
    }
    
    async delete(transaction_id:string):Promise<void>{
        await this.transactionRepository.delete(transaction_id);
    }

    async findAll():Promise<Transaction[]>{
        return this.transactionRepository.find();
    }

    async findTransaction(transaction_id:string){
        const transaction = await this.transactionRepository.findOneBy({transaction_id:transaction_id});
        return transaction;
    }
    /* */
}
/*
async filter(filterTransactionsDto:FilterTransactionsDto):Promise<Transaction>{
    return await this.transactionRepository.findAndCountBy(filterTransactionsDto);
}
    */