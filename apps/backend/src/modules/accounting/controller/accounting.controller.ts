import { Body, Controller, Post } from '@nestjs/common';
import { AccountingService } from '../service/accounting.service';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';

@Controller('accounting')
export class AccountingController {
    constructor(
        private readonly accountingService:AccountingService,
    ){}

    @Post('register-transaction')
    async create(@Body() createTransactionDto:CreateTransactionDto):Promise<Transaction>{
        return await this.accountingService.create(createTransactionDto);
    }
}
