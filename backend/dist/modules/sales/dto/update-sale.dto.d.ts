export declare class UpdateSaleDto {
    sign?: number;
    payment_frecuency?: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    payment_day?: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    number_of_payments?: number;
    quota_value?: number;
    total_sale?: number;
    balance_amount?: number;
}
