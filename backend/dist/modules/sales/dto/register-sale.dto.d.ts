export declare class RegisterSaleDto {
    sale_id: string;
    sign: number;
    payment_frecuency: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    payment_day: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    quota_value: number;
}
