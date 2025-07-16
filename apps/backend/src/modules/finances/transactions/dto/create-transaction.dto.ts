import { IsCurrency, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../transaction.entity';
export class CreateTransactionDto {

    @IsOptional()
    @IsUUID()
    account_id:string;

    @IsOptional()
    tags:[]

    @IsNotEmpty()
    @IsUUID()
    user_id:string;

    @IsCurrency()
    transaction_amount:number;

    @IsEnum(TransactionType)
    transaction_type: TransactionType;

    @IsString()
    transaction_description: string;
}