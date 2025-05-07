import { IsEnum, IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class RegisterSaleDto {

    @IsString()
    @IsNotEmpty()
    sale_id:string;

    @IsNumber()
    @IsNotEmpty()
    sign:number;

    
    @IsEnum({diario:'diario', semanal:'semanal', quincenal:'quincenal', mensual:'mensual'},{message:'Must select one'})
    @IsNotEmpty()
    payment_frecuency:'diario'|'semanal'|'quincenal'|'mensual';

    @IsEnum({lunes:'lunes',martes:'martes',miercoles:'miercoles',jueves:'jueves',viernes:'viernes',sabado:'sabado',domingo:'domingo'},{message:'Must select one'})
    @IsNotEmpty()
    payment_day:'lunes'|'martes'|'miercoles'|'jueves'|'viernes'|'sabado'|'domingo';

    @IsNumber()
    @IsNotEmpty()
    quota_value:number;

}