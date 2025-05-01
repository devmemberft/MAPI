import { IsEnum, IsNumber, IsString, IsOptional } from 'class-validator'

export class UpdateSaleDto {

    @IsString()
    @IsOptional()
    product_id?:string; //apunta a un registro de la tabla de productos

    @IsString()
    @IsOptional()
    client_id?:string; //apunta a un registro de la tabla de clientes

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
    quota_value?:number;
    
    @IsNumber()
    @IsOptional()
    number_of_payments?:number;

    @IsNumber()
    @IsOptional()
    balance_amount?:number;

}