import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentDataBaseModule } from './database/appointments-database.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule,AppointmentDataBaseModule],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
