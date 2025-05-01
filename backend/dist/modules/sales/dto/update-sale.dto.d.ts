export declare class UpdateSaleDto {
    product_id?: string;
    client_id?: string;
    sign?: number;
    payment_frecuency?: 'diario' | 'semanal' | 'quincenal' | 'mensual';
    payment_day?: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';
    quota_value?: number;
    number_of_payments?: number;
    balance_amount?: number;
}
