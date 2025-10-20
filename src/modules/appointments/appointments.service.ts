import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Client } from './entities/client.entity';
import { Service } from './entities/service.entity';


@Injectable()
export class AppointmentsService {

    constructor(
        @InjectRepository(Appointment,'appointmentconnection')
        private readonly appointmentRepository:Repository<Appointment>,

        @InjectRepository(Client,'appointmentconnection')
        private readonly clientRepository: Repository<Client>,

        @InjectRepository(Service,'appointmentconnection')
        private readonly serviceRepository: Repository<Service>,
    ){}

    async create(createAppointmentDto:CreateAppointmentDto):Promise<Appointment>{
        const client = await this.clientRepository.findOneByOrFail({client_id:createAppointmentDto.client_id});
        if(!client) { throw new NotFoundException(`The client was not found. `); }
        const service = await this.serviceRepository.findOneByOrFail({service_id:createAppointmentDto.service_id});
        if(!service) { throw new NotFoundException(`The service was not found. `); }
        
        const overlapping = await this.appointmentRepository.findOne({ where: {scheduled_at: createAppointmentDto.scheduled_at, service}, });
        if(overlapping) { throw new ConflictException('The schedule appointment was already taken. '); }
        
        const newAppointment = this.appointmentRepository.create({...createAppointmentDto, client, service});
        return this.appointmentRepository.save(newAppointment);
    }

    async update(appointment_id:string, dto:UpdateAppointmentDto):Promise<Appointment>{
        const appointment = await this.getAppointmentById(appointment_id);

        Object.assign(appointment,dto);

        return this.appointmentRepository.save(appointment);
    }

    async delete(appointment_id:string):Promise<void>{
        await this.appointmentRepository.delete(appointment_id);
    }

    async cancelAppointment(appointment_id:string):Promise<Appointment>{
        const appointment = await this.getAppointmentById(appointment_id);
        appointment.appointment_status = AppointmentStatus.CANCELLED;
        return this.appointmentRepository.save(appointment);
    }

    async findAll():Promise<Appointment[]>{
        return await this.appointmentRepository.find();
    }

    async getAppointmentById(appointment_id:string):Promise<Appointment>{
        const checkAppointmentExistence = await this.appointmentRepository.findOneBy({appointment_id:appointment_id});
        if(!checkAppointmentExistence) { throw new NotFoundException(`The appointment with id: ${appointment_id} was not found. `); }

        return checkAppointmentExistence;
    }


    async getAppointmentsByClient(client_id:string):Promise<Appointment[]>{
        return this.appointmentRepository.find({
            where: {client: {client_id: client_id}},
            order: { scheduled_at: 'ASC'},
        });
    }

    async getAppointmentsByDate(date:string):Promise<Appointment[]>{
        const day = new Date(date);
        const nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);

        return await this.appointmentRepository.find({
            where: { scheduled_at:Between(day,nextDay)},
            order: { scheduled_at: 'ASC'},
        });
    }

    async getAvailableSlots(service_id:string, date:string):Promise<String[]>{
        const service = await this.serviceRepository.findOneBy({service_id:service_id});
        if(!service) { throw new NotFoundException(`The service was not found. `); }

        const dateObj = new Date(date);
        const slots: String[] = [];

        for(let hour = 8; hour<=18;hour++){
            const start = new Date(dateObj);
            start.setHours(hour, 0,0,0);

            const exists = await this.appointmentRepository.findOneBy({
                scheduled_at:start,
            })
            if(!exists) { slots.push(start.toISOString()); }
        }

        return slots;
    }

}
