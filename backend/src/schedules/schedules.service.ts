import { Schedule } from 'src/schedules/entities/schedule.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { scheduleValidator } from 'src/constants/scheduleValidator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
    private readonly doctorsService: DoctorsService,
  ) {}

  async create(createScheduleDto: CreateScheduleDto, doctorInfo: any) {
    scheduleValidator(createScheduleDto);

    const doctor = await this.doctorsService.findOne({
      where: {
        id: doctorInfo.doctor,
      },
      relations: {
        user: true,
        schedule: true,
      },
    });

    try {
      return this.scheduleRepository.save({ ...createScheduleDto, doctor });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  async update(updateScheduleDto: CreateScheduleDto, doctorInfo) {
    const doctor = await this.doctorsService.findOne({
      where: {
        id: doctorInfo.doctor,
      },
      relations: {
        user: true,
        schedule: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    if (!doctor.schedule) {
      throw new NotFoundException('schedule not created yet');
    }

    return await this.scheduleRepository.save({
      ...doctor.schedule,
      ...updateScheduleDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
