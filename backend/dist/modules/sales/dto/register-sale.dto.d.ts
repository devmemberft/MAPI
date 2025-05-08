export declare class RegisterSaleDto {
    sign: number;
    payment_frecuency: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    payment_day: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    quota_value: number;
}
