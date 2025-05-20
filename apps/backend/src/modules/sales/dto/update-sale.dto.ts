import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator'

export class UpdateSaleDto {

    @IsNumber()
    @IsOptional()
    sign?:number;

    @IsEnum({diario:'diario', semanal:'semanal', quincenal:'quincenal', mensual:'mensual'},{message:'Must select one'})
    @IsOptional()
    payment_frecuency?:'diario'|'semanal'|'quincenal'|'mensual';

    @IsEnum({lunes:'lunes',martes:'martes',miercoles:'miercoles',jueves:'jueves',viernes:'viernes',sabado:'sabado',domingo:'domingo'},{message:'Must select one'})
    @IsOptional()
    payment_day?:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'|'sabado'|'domingo';

    @IsNumber()
    @IsOptional()
    number_of_payments?:number;

    @IsNumber()
    @IsOptional()
    quota_value?:number;
    
    @IsNumber()
    @IsOptional()
    total_sale?:number;

    @IsNumber()
    @IsOptional()
    balance_amount?:number;


}