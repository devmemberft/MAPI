import { IsCurrency, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { TransactionType } from '../transaction.entity';

export class UpdateTransactionDto {

    @IsOptional()
    @IsUUID()
    tag_id:string;

    @IsOptional()
    @IsCurrency()
    transaction_amount:number;

    @IsOptional()
    @IsEnum(TransactionType)
    transaction_type: TransactionType;

    @IsOptional()
    @IsString()
    transaction_description: string;
}