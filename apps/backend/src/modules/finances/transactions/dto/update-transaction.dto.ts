import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class UpdateTransactionDto {

    @IsOptional()
    @IsUUID()
    category_id?:string;

    @IsOptional()
    @IsNumber()
    transaction_amount?:number;

    @IsOptional()
    @IsEnum(TransactionType)
    transaction_type?: TransactionType;

    @IsOptional()
    @IsString()
    transaction_description?: string;
}