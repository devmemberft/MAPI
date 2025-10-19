import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { AppointmentStatus } from "../entities/appointment.entity";

export class UpdateAppointmentDto {
    @IsOptional()
    @IsUUID()
    client_id?:string;

    @IsOptional()
    @IsUUID()
    service_id?:string;

    @IsOptional()
    @IsDateString()
    scheduled_at?:string;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?:AppointmentStatus;

    @IsOptional()
    @IsString()
    notes?:string;
}