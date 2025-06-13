import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { AppointmentStatus } from "../entities/appointment.entity";

export class CreateAppointmentDto {
    @IsUUID()
    client_id:string;

    @IsUUID()
    service_id:string;

    @IsDateString()
    scheduled_at:string;

    @IsOptional()
    @IsEnum(AppointmentStatus)
    status?:AppointmentStatus;

    @IsOptional()
    @IsString()
    notes?:string;
}