import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';


@Injectable()
export class AppointmentsService {

    constructor(
        @InjectRepository(Appointment,'appointmentConnection')
        private readonly appointmentRepository:Repository<Appointment>,
    ){}

    async create(createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        const newAppointment = await this.appointmentRepository.create(createAppointmentDto);
        return this.appointmentRepository.save(newAppointment);
    }

    async update(appointment_id:string, dto:UpdateAppointmentDto):Promise<Appointment>{
        const checkExistence = await this.appointmentRepository.findOne({ where: {appointment_id:appointment_id}})
        if(!checkExistence){ throw new NotFoundException('The appointment was not found. '); }

        Object.assign(dto,checkExistence);

        return this.appointmentRepository.save(checkExistence); //or maybe dto, im not sure
    }

    async delete(appointment_id:string):Promise<void>{
        await this.appointmentRepository.delete(appointment_id);
    }

    async findAll():Promise<Appointment[]>{
        return await this.appointmentRepository.find();
    }
}
