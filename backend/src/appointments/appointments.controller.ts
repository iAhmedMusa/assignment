import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserTypes } from 'src/auth/user-types.guard';
import { UserType } from 'src/users/entities/user.entity';
import { Appointment } from './entities/appointment.entity';
import { Equal } from 'typeorm';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @UseGuards(AuthGuard, new UserTypes([UserType.Patient]))
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
    @Request() req: any,
  ) {
    return await this.appointmentsService.create(
      createAppointmentDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor, UserType.Patient]))
  @Get()
  async findAll(@Request() req: any): Promise<Appointment[]> {
    const options: any = {
      relations: {
        doctor: {
          user: true,
        },
        patient: true,
        prescription: true,
      },
      order: {
        created_at: 'DESC',
      },
    };

    // this API guard ensure that only patient and doctor
    // can access this API, so every request will come with user
    // and user type can only be 'patient' or 'doctor'
    if (req.user.type === UserType.Patient) {
      options.where = {
        patient: Equal(+req.user.sub),
      };
    } else {
      options.where = {
        doctor: Equal(+req.user.doctor),
      };
    }

    try {
      return await this.appointmentsService.findAll(options);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor, UserType.Patient]))
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const options: any = {
      where: {
        id: Equal(+id),
      },
      relations: {
        doctor: {
          user: true,
        },
        patient: true,
        prescription: true,
      },
    };

    // this API guard ensure that only patient and doctor
    // can access this API, so every request will come with user
    // and user type can only be 'patient' or 'doctor'
    if (req.user.type === UserType.Patient) {
      options.where = {
        ...options.where,
        patient: Equal(+req.user.sub),
      };
    } else {
      options.where = {
        ...options.where,
        doctor: Equal(+req.user.doctor),
      };
    }

    try {
      return this.appointmentsService.findOne(options);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Doctor]))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Request() req: any,
  ): Promise<Appointment> {
    return await this.appointmentsService.update(
      +id,
      updateAppointmentDto,
      req.user,
    );
  }

  @UseGuards(AuthGuard, new UserTypes([UserType.Patient]))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    return await this.appointmentsService.remove(+id, req.user);
  }
}
