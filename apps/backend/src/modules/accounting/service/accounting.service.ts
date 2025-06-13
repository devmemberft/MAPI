import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { FilterTransactionsDto } from '../dto/filter-transactions.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class AccountingService {
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
    /*
    async update():Promise<Transaction>{}

    async delete():Promise<void>{}

    async findAll():Promise<Transaction>{}
    
*/
}
/*
async filter(filterTransactionsDto:FilterTransactionsDto):Promise<Transaction>{
    return await this.transactionRepository.findAndCountBy(filterTransactionsDto);
}
    */