import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
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

    @Patch('update/:id')
    async update(@Param('transaction_id') transaction_id:string, @Body() updateTransactionDto:UpdateTransactionDto):Promise<Transaction>{
        return await this.transactionService.update(transaction_id,updateTransactionDto);
    }

    @Delete('delete/:id')
    async delete(@Param('transaction_id') transaction_id:string):Promise<void>{
        return await this.transactionService.delete(transaction_id);
    }

    @Get()
    async findAll():Promise<Transaction[]>{
        return await this.transactionService.findAll();
    }
}
