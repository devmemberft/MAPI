import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionType } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('finances/transactions')
export class TransactionController {
    constructor(
        private readonly transactionService:TransactionService,
    ){}

    @Post('register-transaction')
    async create(@Body() createTransactionDto:CreateTransactionDto):Promise<Transaction>{
        return await this.transactionService.create(createTransactionDto);
    }

    @Patch('update-transaction')
    async update(@Query('transaction_id') transaction_id:string, @Body() updateTransactionDto:UpdateTransactionDto):Promise<Transaction>{
        return await this.transactionService.update(transaction_id,updateTransactionDto);
    }

    @Delete('delete-transaction')
    async delete(@Query('transaction_id') transaction_id:string):Promise<void>{
        return await this.transactionService.delete(transaction_id);
    }

    @Get()
    async findAll():Promise<Transaction[]>{
        return await this.transactionService.findAll();
    }

    @Get()
    async findOneById(@Query('transaction_id') transaction_id:string):Promise<Transaction>{
        return await this.transactionService.findOneTransactionById(transaction_id);
    }

    @Get()
    async findOneByType(@Query('transaction_type') transaction_type:TransactionType):Promise<Transaction[]>{
        return await this.transactionService.findTransactionsByType(transaction_type);
    }
}
