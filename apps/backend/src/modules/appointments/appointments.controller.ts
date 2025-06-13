import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private readonly appointmentsService:AppointmentsService,
    ){}

    @Post('create')
    async create(@Body() createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        return await this.appointmentsService.create(createAppointmentDto);
    }

    @Patch('update/:id')
    async update(@Query('appointment_id') appointment_id:string, @Body() updateAppointmentDto:UpdateAppointmentDto):Promise<Appointment>{
        return await this.appointmentsService.update(appointment_id,updateAppointmentDto);
    }

    @Delete('delete/:id')
    async delete(@Query('appointment_id') appointment_id:string):Promise<void>{
        return await this.appointmentsService.delete(appointment_id);
    }

    @Get()
    async findAll():Promise<Appointment[]>{
        return await this.appointmentsService.findAll();
    }

}
