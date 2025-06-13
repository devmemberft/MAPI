import { IsOptional, IsEnum } from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

export class FilterTransactionsDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;
}
