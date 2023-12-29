import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { Equal, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { User } from 'src/users/entities/user.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly usersService: UsersService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto, user: any) {
    const patient: User = await this.usersService.findOne({
      where: {
        id: +user?.sub,
      },
    });

    if (!patient) {
      throw new ConflictException('Patient not found');
    }

    const doctor: Doctor = await this.doctorsService.findOne({
      where: {
        id: +createAppointmentDto.doctor,
      },
    });

    if (!doctor) {
      throw new ConflictException('Patient not found');
    }

    try {
      return await this.appointmentRepository.save({
        doctor,
        patient,
        status: AppointmentStatus.Pending,
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(options: any): Promise<Appointment[]> {
    const appointments: Appointment[] = await this.appointmentRepository.find(
      options,
    );

    return appointments.map((appointment) => {
      delete appointment?.patient?.password;
      delete appointment?.doctor?.user?.password;

      return appointment;
    });
  }

  async findOne(options: any): Promise<Appointment> {
    const appointment: Appointment = await this.appointmentRepository.findOne(
      options,
    );

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    delete appointment?.patient?.password;
    delete appointment?.doctor?.user?.password;

    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
    user: any,
  ): Promise<Appointment> {
    const options: any = {
      where: {
        id: Equal(id),
        doctor: {
          id: Equal(+user.doctor),
        },
      },
      relations: {
        doctor: true,
        patient: true,
      },
    };

    const appointment: Appointment = await this.findOne(options);

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    try {
      const updatedAppointment = await this.appointmentRepository.save({
        ...appointment,
        status: updateAppointmentDto.status,
      });

      delete updatedAppointment?.patient?.password;

      return updatedAppointment;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number, user: any) {
    const options: any = {
      where: {
        id: Equal(id),
        patient: {
          id: Equal(+user.sub),
        },
      },
      relations: {
        doctor: true,
        patient: true,
      },
    };

    const appointment: Appointment = await this.appointmentRepository.findOne(
      options,
    );

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    try {
      const deletedAppointment = await this.appointmentRepository.remove(
        appointment,
      );

      return deletedAppointment;
    } catch (error) {
      throw error;
    }
  }
}
