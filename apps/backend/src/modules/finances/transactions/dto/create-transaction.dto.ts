import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../transaction.entity';
export class CreateTransactionDto {

    @IsOptional()
    @IsUUID()
    category_id?:string;

    @IsNumber()
    transaction_amount:number;

    @IsEnum(TransactionType)
    transaction_type: TransactionType;

    @IsString()
    transaction_description: string;
}