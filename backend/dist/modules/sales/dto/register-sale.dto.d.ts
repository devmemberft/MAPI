export declare class RegisterSaleDto {
    sale_id: string;
    sign: number;
    payment_day: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    payment_frecuency: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    number_of_payments?: number;
    balance_amount?: number;
    quota_value: number;
}
