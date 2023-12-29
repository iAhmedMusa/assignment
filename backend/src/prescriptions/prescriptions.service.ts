import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { Equal, Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { PharmacistsService } from 'src/pharmacists/pharmacists.service';
import {
  Appointment,
  AppointmentStatus,
} from 'src/appointments/entities/appointment.entity';
import { DoctorAdviceDto } from './dto/doctor-advice.dto';
import { AppointPharmacistDto } from './dto/appoint-pharmacist.dto';
import { PharmacistAdviceDto } from './dto/pharmacist-advice.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    private readonly usersService: UsersService,
    private readonly doctorsService: DoctorsService,
    private readonly appointmentsService: AppointmentsService,
    private readonly pharmacistsService: PharmacistsService,
  ) {}

  async create(
    createPrescriptionDto: CreatePrescriptionDto,
    patient: any,
  ): Promise<Prescription> {
    const appointment: Appointment = await this.appointmentsService.findOne({
      where: {
        id: createPrescriptionDto.appointment_id,
      },
      relations: {
        doctor: {
          user: true,
        },
        patient: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    if (appointment.status !== AppointmentStatus.Accepted) {
      throw new ConflictException(`appointment is ${appointment.status}`);
    }

    if (appointment.patient.id !== patient.sub) {
      throw new UnauthorizedException('invalid credential');
    }

    try {
      return await this.prescriptionRepository.save({
        ...createPrescriptionDto,
        appointment: appointment,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          'Already created a prescription for this appointment',
        );
      }
      throw error;
    }
  }

  async findAll(options: any): Promise<Prescription[]> {
    return await this.prescriptionRepository.find(options);
  }

  async findOne(options: any): Promise<Prescription> {
    const prescription: Prescription =
      await this.prescriptionRepository.findOne(options);

    if (!prescription) {
      throw new NotFoundException('prescription not found');
    }

    return prescription;
  }

  async doctorAdvice(
    id: number,
    doctorAdviceDto: DoctorAdviceDto,
    doctor: any,
  ) {
    const prescription: Prescription =
      await this.prescriptionRepository.findOne({
        where: {
          id: Equal(+id),
          appointment: {
            doctor: {
              id: Equal(+doctor.doctor),
            },
          },
        },
        relations: {
          appointment: {
            doctor: {
              user: true,
            },
            patient: true,
          },
          pharmacist: {
            user: true,
          },
        },
      });

    if (!prescription) {
      throw new NotFoundException('prescription not found');
    }

    return await this.prescriptionRepository
      .save({
        ...prescription,
        ...doctorAdviceDto,
      })
      .catch((error) => {
        throw error;
      });
  }

  async appointPharmacist(
    id: number,
    appointPharmacistDto: AppointPharmacistDto,
    user: any,
  ) {
    const prescription: Prescription = await this.findOne({
      where: {
        id: Equal(id),
        appointment: {
          patient: {
            id: Equal(+user.sub),
          },
        },
      },
      relations: {
        pharmacist: true,
      },
    });

    if (!prescription) {
      throw new NotFoundException('prescription not found');
    }

    if (prescription.pharmacist) {
      throw new ConflictException('pharmacist already added');
    }

    const pharmacist = await this.pharmacistsService.findOne({
      where: {
        id: Equal(+appointPharmacistDto.pharmacistId),
      },
    });

    if (!pharmacist) {
      throw new NotFoundException('pharmacist not found');
    }

    return await this.prescriptionRepository.save({
      ...prescription,
      pharmacist,
    });
  }

  async pharmacistAdvice(
    id: number,
    pharmacistAdviceDto: PharmacistAdviceDto,
    pharmacist: any,
  ) {
    const prescription: Prescription = await this.findOne({
      where: {
        id: Equal(id),
        pharmacist: {
          id: Equal(+pharmacist.pharmacist),
        },
      },
      relations: {
        appointment: {
          doctor: {
            user: true,
          },
          patient: true,
        },
        pharmacist: {
          user: true,
        },
      },
    });

    if (!prescription) {
      throw new NotFoundException('prescription not found');
    }

    return this.prescriptionRepository.save({
      ...prescription,
      pharmacist_advice: pharmacistAdviceDto.pharmacist_advice,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} prescription`;
  }
}
